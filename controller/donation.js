const pool = require("../config/db");
const ResponseClass = require("../model/response")
const uploadFile = require("../middleware/upload");
const moment = require("moment");
const res = require("express/lib/response");

const getDonation = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM donation', (error, results) => {
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
const getDonationById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id_donation = parseInt(request.params.id_donation)
    pool.query('SELECT * FROM donation WHERE id_donation = $1', [id_donation], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "Data donation not found";
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
const createDonation = async (request, response) => {
    try {
        await uploadFile(request, response);
        if (request.file == undefined) {
            return response.status(400).send({ message: "Please upload a file!" });
        }
        const { id_project, nominal, name, nowhatsapp, description, is_anonim, id_transfer_method } = request.body;
        const photo = __basedir + "/resources/" + request.file.originalname;
        pool.query('INSERT INTO donation (id_project, nominal, name, nowhatsapp, description, is_anonim, photo) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id_project, nominal, name, nowhatsapp, description, is_anonim, photo], (error, results) => {
            if (error) {
                throw error
            }
            
            var nominal_substring = (request.body.nominal).substring(0,((request.body.nominal).length-3));
            var nominal_unique = nominal_substring.concat(Math.floor(Math.random() * 900) + 100);
            var expired = moment().add(1, 'days').format('YYYY-MM-DD hh:mm:ss');

            pool.query('INSERT INTO trx_donation (id_donation, id_transfer_method, status, nominal, trx_expired) VALUES ($1, $2, $3, $4, $5)', [2, id_transfer_method, 0, nominal_unique, expired], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send("Donation added");
        })
        })
      } catch (error) {
        response.status(500).send({
          message: `Could not upload the file:. ${error}`,
        });
    }
}
const deleteDonation = (request, response) => {
    const id_donation = parseInt(request.params.id_donation)
    pool.query('DELETE FROM donation WHERE id_donation = $1', [id_donation], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Data donation deleted");
    })
}
  module.exports = {
    getDonation,
    getDonationById,
    createDonation,
    deleteDonation,
  };


