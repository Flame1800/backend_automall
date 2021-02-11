const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'automall'
});

connection.connect((error) => {
    if (error) {
        return console.log('Connection error from DB')
    } else {
        return console.log('Connect!')
    }
})

module.exports = connection