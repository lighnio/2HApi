const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors');
const { response } = require('express');
const { request } = require('express');
const { json } = require('express/lib/response');


/*********************/
//        Db
/*********************/
const Db = require('./db/dboperations');
const dboperations = require('./db/dboperations');



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

app.use(cors({credentials: true}));
app.use('/2h', router);

app.set('port', process.env.PORT || 4444);

app.listen(app.get('port'), () => console.log(`App running on port ${app.get('port')}`));

/*********************/
//   Middleware
/*********************/

router.use((req, res, next) => {

    //to allow cross domain requests to send cookie information.
    res.header('Access-Control-Allow-Credentials', false);

    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.header('Access-Control-Allow-Origin',  req.headers.origin);

    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

    next();
})

/*********************/
//   API Routes
/*********************/

// Personas
router.route('/personas').get((req, res) => {
    Db.getPersonas().then( data => {
        res.json(data[0]);
    }).catch(err => {console.log(err)})
})

router.route('/personas/:id').get((req, res) => {
    Db.getPersona(req.params.id).then( data => {
        res.json(data[0]);
    }).catch(err => {console.log(err)})
})

router.route('/personas').post((req, res) => {
    let persona = {...req.body};
    Db.addPersona(persona).then(data => {
        res.status(201).json(data);
    }).catch(err => {console.log(err)})
})

router.route('/personas/:id').delete((req, res) => {
    let IdPersona = req.params.id;
    Db.deletePersona(IdPersona).then(data => {
        res.status(200).json(data);
    }).catch(err => {console.log(err)})
})

router.route('/personas/:id').put((req, res) => {
    let persona = {...req.body}
    // let IdPersona = req.params.id;
    Db.editPersona(persona).then(data => {
        res.status(200).json(data);
    }).catch(err => {console.log(err)})
})

// Empleados

router.route('/empleados').get((req, res) => {
    Db.getEmpleados().then( data => {
        res.json(data[0]);
    }).catch(err => {console.log(err)})
})

router.route('/empleados/:id').get((req, res) => {
    Db.getEmpleado(req.params.id).then( data => {
        res.json(data[0]);
    }).catch(err => {console.log(err)})
})

router.route('/empleados').post((req, res) => {
    let empleado = {...req.body}
    Db.addEmpleado(empleado).then(data => {
        res.status(200).json(data);
    }).catch(err => {console.log('err: ', err)})
})

router.route('/empleados/:id').put((req, res) => {
    let empleado = {...req.body}
    Db.editEmpleado(empleado).then(data => {
        res.status(200).json(data);
    }).catch(err => {console.log(err)})
})

router.route('/empleados/:id').delete((req, res) => {
    Db.deleteEmpleado(req.params.id).then(data => {
        res.status(200).json(data);
    }).catch(err => {console.log(err)})
})

// Registro

router.route('/registro').get((req, res) => {
    Db.getRegistro().then(data => {
        res.json(data[0]);
    }).catch(err => {console.log(err)})
})

router.route('/registro').post((req, res) => {
    let registro = {...req.body}
    Db.addRegistro(registro).then(data => {
        res.status(200).json(data);
    }).catch(err => {console.log(err)})
})

// Planilla

router.route('/planilla').get((req, res) => {
    Db.getPlanilla().then(data => {
        res.json(data[0]);
    }).catch(err => {console.log(err)})
})