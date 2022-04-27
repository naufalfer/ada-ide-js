const pool = require("../config/db");
const ResponseClass = require("../model/response")

const getType = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM type', (error, results) => {
        if (error) {
            throw error
        }
        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows;
        response.status(200).json(responseReturn);
    })
}
const getTypeById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id_type = parseInt(request.params.id_type)
    pool.query('SELECT * FROM type WHERE id_type = $1', [id_type], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "Data type not found";
            responseReturn.data = null;
        } else {
            responseReturn.status = true;
            responseReturn.code = 200;
            responseReturn.message = "Success";
            responseReturn.data = results.rows[0];
        }
        response.status(200).json(responseReturn);
    })
}
const createType = (request, response) => {
    const { project_name } = request.body;
    pool.query('INSERT INTO type (project_name) VALUES ($1)', [project_name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Type added");
    })
}
const updateType = (request, response) => {
    const id_type = parseInt(request.params.id_type);
    var responseReturn = new ResponseClass();
    try {
        const { project_name } = request.body;
        pool.query('UPDATE type SET project_name = $1 WHERE id_type = $2', [project_name, id_type], (error, results) => {
            if (error) {
                throw error
            }
            responseReturn.status = true;
            responseReturn.code = 200;
            responseReturn.message = "Data type modification successed";
            responseReturn.data = null;
            response.status(200).send(responseReturn);
        })
    } catch (error) {
        responseReturn.status = false;
        responseReturn.code = 500;
        responseReturn.message = error.message;
        responseReturn.data = null
        response.status(500).json(responseReturn);
    }
}
const deleteType = (request, response) => {
    const id_type = parseInt(request.params.id_type)
    pool.query('DELETE FROM type WHERE id_type = $1', [id_type], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Data type deleted");
    })
}
module.exports = {
    getType,
    getTypeById,
    createType,
    updateType,
    deleteType
}
