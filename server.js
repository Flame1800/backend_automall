const express = require('express');
const port = process.env.PORT || 4000
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const db = require('./models')
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

const routes = require('./settings/routes')
routes(app)


db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
})