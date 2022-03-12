const config = require('./dbconfig')
const sql = require('mssql');
const res = require('express/lib/response');


/*********************/
//      ROUTES
/*********************/

// Persona
async function getPersonas() {
    try{
        let pool = await sql.connect(config);
        let personas = await pool.request()
        .execute('GetPersonas');
        return personas.recordsets;
    }catch(err){console.log(err);}
}

async function getPersona(PersonaId){
    try{
        let pool = await sql.connect(config);
        let persona = pool.request()
        .input('IdPersona', sql.Int, PersonaId)
        .execute('GetPersona');
        return (await persona).recordsets;
                 
    }catch(err){console.log(err);}
}

async function addPersona(persona){
    try{
        let pool = await sql.connect(config);
        let insertPersona = pool.request()
        .input('Nombre', sql.NVarChar, persona.Nombre)
        .input('FechaDeNacimiento', sql.DateTime, persona.FechaDeNacimiento)
        .input('Genero', sql.NVarChar, persona.Genero)
        .execute('InsertarPersona');
        return (await insertPersona).recordsets;
    } catch(err){console.log(err);}
}

// addPersona({
//     IdPersona: 158,
//     Nombre: 'Joshua',
//     FechaDeNacimiento: '2000-03-03',
//     Genero: 'M'
// })

async function deletePersona(IdPersona){
    try{
        let pool = await sql.connect(config);
        let deletePersona = pool.request()
        .input('IdPersona', sql.Int, IdPersona)
        .execute('EliminarPersona');
        return deletePersona.recordsets;
    }catch(err){console.log(err);}
}

// deletePersona(100)

async function editPersona(persona){
    try {
        let pool = await sql.connect(config);
        let editPersona = pool.request()
        .input('IdPersona', sql.Int, persona.IdPersona)
        .input('Nombre', sql.NVarChar, persona.Nombre)
        .input('FechaDeNacimiento', sql.DateTime, persona.FechaDeNacimiento)
        .input('Genero', sql.NVarChar, persona.Genero)
        .execute('ActualizarPersona');
    } catch (err) {console.log(err)}
}

// Empleado

async function getEmpleados(){
    try{
        let pool = await sql.connect(config);
        let personas = pool.request()
        .execute('GetEmpleados');
        return (await personas).recordsets;
    }catch(err) {console.log(err)}
}

async function getEmpleado(IdEmpleado){
    try {
        let pool = await sql.connect(config);
        let empleado = pool.request()
        .input('IdEmpleado', sql.Int, IdEmpleado)
        .execute('GetEmpleado');
        return (await empleado).recordset
    } catch (err) {console.log(err)}
}

async function addEmpleado(empleado){
    try {
        let pool = await sql.connect(config);
        let addEmpleado = pool.request()
        .input('IdPersona', sql.Int, empleado.IdPersona) 
        .input('IdDepartamento', sql.Int, empleado.IdDepartamento) 
        .input('IdPuesto', sql.Int, empleado.IdPuesto)
        .execute('InsertarEmpleado')
        return (await addEmpleado).recordset
    } catch (err) {
        
    }
}

async function editEmpleado(empleado){
    try {
        let pool = await sql.connect(config);
        let editEmpleado = pool.request()
        .input('IdEmpleado', sql.Int, empleado.IdEmpleado)
        .input('IdPersona', sql.Int, empleado.IdPersona)
        .input('IdDepartamento', sql.Int, empleado.IdDepartamento)
        .execute('ActualizarEmpleado');
    } catch (err) {
        console.log(err);
        // res.json(err);
    }
}

async function deleteEmpleado(IdEmpleado){
    let pool = await sql.connect(config);
    let deleteEmpleado = pool.request()
    .input('IdEmpleado', sql.Int, IdEmpleado)
    .execute('EliminarEmpleado')
}

// Registro

async function getRegistro(){
    let pool = await sql.connect(config);
    let registro = pool.request()
    .execute('GetRegistro')
    return (await registro).recordsets
}

async function addRegistro(registro){
    let pool = await sql.connect(config);
    let addRegistro = pool.request()
    .input('CodigoEmpleado', sql.Int, registro.CodigoEmpleado)
    .input('TipoMovimiento', sql.VarChar, registro.TipoMovimiento)
    .input('Jornada', sql.Int, registro.Jornada)
    .execute('InsertarRegistro');
}

// Planilla

async function getPlanilla(){
    let pool = await sql.connect(config);
    let planilla = pool.request()
    .execute('Planilla');
    return (await planilla).recordsets
}

/*********************/
//      EXPORTS
/*********************/

module.exports = {
    // Personas Methods
    getPersonas: getPersonas,
    getPersona: getPersona,
    addPersona: addPersona,
    deletePersona: deletePersona,
    editPersona: editPersona,
    // Empleado Methods
    getEmpleados: getEmpleados,
    getEmpleado: getEmpleado,
    addEmpleado: addEmpleado,
    editEmpleado: editEmpleado,
    deleteEmpleado: deleteEmpleado,
    // Registro
    getRegistro: getRegistro,
    addRegistro: addRegistro,
    // Planilla
    getPlanilla: getPlanilla
    
    // ... 
}