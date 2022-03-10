const Db = require('./db/dboperations')
const Persona = require('./classes/persona')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { response } = require('express');
const { request } = require('express');

/*********************/
//   Initializations
/*********************/

const app = express();
const router = express();

/*********************/
//   Configuration
/*********************/

app.use(express.urlencoded({    extended: true   }));
app.use(express.json());

app.use(cors());
app.use('/2h', router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log(`App running on port ${app.get('port')}`));

/*********************/
//   Middleware
/*********************/

router.use((req, res, next) => {
    console.log('middleware');
    next();
})

/*********************/
//   API Routes
/*********************/

router.route('/personas').get((req, res) => {
    Db.getPersonas().then( data => {
        res.json(data[0]);
    })
})

router.route('/personas/:id').get((req, res) => {
    Db.getPersona(req.params.id).then( data => {
        res.json(data[0]);
    })
})

router.route('/personas').post((req, res) => {
    let persona = {...req.body};
    console.log(req);
    Db.addPersona(persona).then(data => {
        res.status(201).json(data);
    })
})