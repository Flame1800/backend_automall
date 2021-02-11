const express = require('express');
const port = process.env.PORT || 4000
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./settings/routes')
routes(app)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});