require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require("../postgres");
const { handleErrors, ValidationError } = require("../validation")

const register = async function(_, { input }){
    const {username, email, password} = input;

    const errors = await handleErrors(username, email, password);

    if(errors.length){
        throw new ValidationError(errors);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const text = 'insert into users(username, email, password, role) values($1, $2, $3, $4) RETURNING *';
    const values = [username, email, hashedPassword, 'user'];

    try{
        const res = await db.query(text, values);
        return res.rows[0]
    }catch(err){
        throw new Error(err)
    }
}

const login = async function(_, args){
    const {email, password} = args;

    const res = await db.query('select * from users where email = $1', [email]);
    const user = res.rows[0];

    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            const token = signJwtToken(user.id, user.role);
            return {user, token}
        }else{
            throw new Error('Wrong credentials')
        }
    }else{
        throw new Error('There is no user with such credentials')
    }
}

const signJwtToken = async function(id, role) {
    const payload = { id, role };
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const resolvers = {
    Mutation : {
        register: register,
        login: login
    }
}

module.exports = {
    resolvers
}