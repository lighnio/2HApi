const config = require('./db/dbconfig')
const sql = require('mssql');

async function getPersonas() {
    try{
        let pool = await sql.connect(config);
        let personas = await pool.request().query('SELECT * FROM Persona');
        return personas.recordsets;
    }catch(err){console.log(err);}
}

async function getPersona(PersonaId){
    try{
        let pool = sql.connect(config);
        let persona = await pool.request()
        .input('IdPersona', sql.NVarChar, PersonaId)
        .query('SELECT * FROM Persona WHERE IdPersona = @IdPersona');
        return persona.recordsets;
                 
    }catch(err){console.log(err);}
}

async function addPersona(persona){
    try{
        let pool = await sql.connect(config);
        let insertPersona = pool.request()
        .input('IdPersona', sql.Int, persona.IdPersona)
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
        let pool = sql.connect(config);
        let deletePersona = (await pool).request()
        .input('IdPersona', sql.Int, IdPersona)
        .execute('EliminarPersona');
        return deletePersona.recordsets;
    }catch(err){console.log(err);}
}

/*********************/
//      EXPORTS
/*********************/

module.exports = {
    // Personas Methods
    getPersonas: getPersonas,
    getPersona: getPersona,
    addPersona: addPersona,
    deletePersona: deletePersona   
    // ... 
}