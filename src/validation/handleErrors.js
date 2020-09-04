const validator = require("validator");
const { db } = require("../postgres");

const handleErrors = async function( username, email, password ){
    let errors = [];
    if (validator.isEmpty(email)) {
        errors.push({ key: 'email', message: 'The email address must not be empty.' });
    } else if (!validator.isEmail(email)) {
        errors.push({ key: 'email', message: 'This is not email' });
    }

    if (validator.isEmpty(password)) {
        errors.push({ key: 'password', message: 'The password filed must not be empty.' });
    } else if (!validator.isLength(password, { min: 8 })) {
        errors.push({ key: 'password', message: 'The password must be at a minimum 8 characters long.' });
    }

    const res = await db.query('select * from users where email = $1', [email]);
    if(res.rows[0]){
        errors.push({ key: 'email', message: 'A user with this email address already exists.' });
    }

    return errors
}

module.exports = {
    handleErrors
}