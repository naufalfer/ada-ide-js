const pool = require("../config/db");
const ResponseClass = require("../model/response")
const uploadFile = require("../middleware/upload");

const getProject = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM project', (error, results) => {
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
const getProjectById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id_project = parseInt(request.params.id_project)
    pool.query('SELECT * FROM project WHERE id_project = $1', [id_project], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "Data project not found";
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
const createProject = async (request, response) => {
    try {
        await uploadFile(request, response);
        if (request.file == undefined) {
            return response.status(400).send({ message: "Please upload a file!" });
        }
        const { project_name, id_type, start_date, end_date, target_fund, current_fund, description } = request.body;
        const photo = __basedir + "/resources/" + request.file.originalname;
        pool.query('INSERT INTO project (project_name, id_type, start_date, end_date, target_fund, current_fund, photo, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [project_name, id_type, start_date, end_date, target_fund, current_fund, photo, description], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send("Project added");
        })
      } catch (error) {
        response.status(500).send({
          message: `Could not upload the file:. ${error}`,
        });
    }
}
const updateProject = async (request, response) => {
    try {
        await uploadFile(request, response);
        if (request.file == undefined) {
            return response.status(400).send({ message: "Please upload a file!" });
        }

        const id_project = parseInt(request.params.id_project);
        const { project_name, id_type, start_date, end_date, target_fund, current_fund, description } = request.body;
        const photo = __basedir + "/resources/" + request.file.originalname;
        pool.query('UPDATE project SET project_name = $1, id_type = $2, start_date = $3, end_date = $4, target_fund = $5, current_fund = $6, photo = $7, description = $8 WHERE id_project = $9', [project_name, id_type, start_date, end_date, target_fund, current_fund, photo, description, id_project], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send("Project added");
        })
      } catch (error) {
        response.status(500).send({
          message: `Could not upload the file:. ${error}`,
        });
    }
}
const deleteProject = (request, response) => {
    const id_project = parseInt(request.params.id_project)
    pool.query('DELETE FROM project WHERE id_project = $1', [id_project], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Data project deleted");
    })
}
  module.exports = {
    getProject,
    getProjectById,
    deleteProject,
    createProject,
    updateProject,
  };


