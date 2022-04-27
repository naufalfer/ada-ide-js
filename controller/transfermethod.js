const pool = require("../config/db");
const ResponseClass = require("../model/response")

const getTransferMethod = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM transfer_method', (error, results) => {
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
const getTransferMethodById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id_transfer_method = parseInt(request.params.id_transfer_method)
    pool.query('SELECT * FROM transfer_method WHERE id_transfer_method = $1', [id_transfer_method], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "Data transfer method not found";
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
const createTransferMethod = (request, response) => {
    const { bank_name, account_no, account_name } = request.body;
    pool.query('INSERT INTO transfer_method (bank_name, account_no, account_name) VALUES ($1, $2, $3)', [bank_name, account_no, account_name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Transfer method added");
    })
}
const updateTransferMethod = (request, response) => {
    const id_transfer_method = parseInt(request.params.id_transfer_method);
    var responseReturn = new ResponseClass();
    try {
        const { bank_name, account_no, account_name } = request.body;
        pool.query('UPDATE transfer_method SET bank_name = $1, account_no = $2, account_name = $3 WHERE id_transfer_method = $4', [bank_name, account_no, account_name, id_transfer_method], (error, results) => {
            if (error) {
                throw error
            }
            responseReturn.status = true;
            responseReturn.code = 200;
            responseReturn.message = "Data transfer method modification successed";
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
const deleteTransferMethod = (request, response) => {
    const id_transfer_method = parseInt(request.params.id_transfer_method)
    pool.query('DELETE FROM transfer_method WHERE id_transfer_method = $1', [id_transfer_method], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Data transfer method deleted");
    })
}
module.exports = {
    getTransferMethod,
    getTransferMethodById,
    createTransferMethod,
    updateTransferMethod,
    deleteTransferMethod
}
