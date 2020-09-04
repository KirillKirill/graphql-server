const { db } = require("../postgres");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

const login = async function(){

}

const signJwtToken = async function(id, role) {
    const payload = { id, role };
    return jwt.sign(payload);
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