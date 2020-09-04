const { db } = require("../postgres");

const getUserById = async function(_, {id}) {
    const text = 'select * from users where id = $1';
    const values = [id];

    try {
        const res = await db.query(text, values);
        return res.rows[0]
    }catch(err){
        throw new Error(err)
    }
}

const getUsers = async function() {
    const text = 'select * from users';

    try{
        const res = await db.query(text);
        return res.rows
    }catch(err){

    }
}

const updateUser = async function(_, args){
    const text = `update users set username = $1, email = $2, password = $3, role = $4 where id = $5 RETURNING *`;

    try {
        const res = await db.query( text, [...args]);
        return res.rows[0]
    }catch(err){
        throw new Error(err)
    }
}

const deleteUser = async function(_, args){
    const { id } = args;
    const text = `delete from users where id = $1 RETURNING *`;

    try{
        const res = await db.query(text, [id]);
        return res.rows[0]
    }catch(err){
        throw new Error(err)
    }
}

const resolvers = {
    Query: {
        user: getUserById,
        users: getUsers
    },
    Mutation : {
        update: updateUser,
        delete: deleteUser
    }
}

module.exports = {
    resolvers
}