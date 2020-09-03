const { db } = require("../postgres");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async function(_, args){
    const {username, email, password} = args;
    if(await getUserByEmail(email)){
        throw new Error('User with such email already exists')
    }else {
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
}

const getUserByEmail = async function(email){
    const text = 'select * from users where email = $1';
    try{
        const res = await db.query(text, [email]);
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