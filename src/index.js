const Db = require('./db/dboperations')
const Persona = require('./classes/persona')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

/*********************/
//   Initializations
/*********************/

const app = express();
const router = express();

/*********************/
//   Configuration
/*********************/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(process.env.PORT || 3000);
console.log('2H Api is running at: ', app.get('port'));

