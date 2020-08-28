const { db } = require("./pgAdaptor");

db.query('select * from users')
    .then(res => {
        console.log(res);
    });