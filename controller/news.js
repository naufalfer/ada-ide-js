const pool = require("../config/db");
const ResponseClass = require("../model/response")
const uploadFile = require("../middleware/upload");

const getNews = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM news', (error, results) => {
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
const getNewsById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id_news = parseInt(request.params.id_news)
    pool.query('SELECT * FROM news WHERE id_news = $1', [id_news], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "Data news not found";
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
const createNews = async (request, response) => {
    try {
        await uploadFile(request, response);
        if (request.file == undefined) {
            return response.status(400).send({ message: "Please upload a file!" });
        }
        const { id_project, news_date, title, description } = request.body;
        const photo = __basedir + "/resources/" + request.file.originalname;
        pool.query('INSERT INTO news (id_project, news_date, title, description, photo) VALUES ($1, $2, $3, $4, $5)', [id_project, news_date, title, description, photo], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send("News added");
        })
      } catch (error) {
        response.status(500).send({
          message: `Could not upload the file:. ${error}`,
        });
    }
}
const updateNews = async (request, response) => {
    try {
        await uploadFile(request, response);
        if (request.file == undefined) {
            return response.status(400).send({ message: "Please upload a file!" });
        }

        const id_news = parseInt(request.params.id_news);
        const { id_project, news_date, title, description } = request.body;
        const photo = __basedir + "/resources/" + request.file.originalname;
        pool.query('UPDATE news SET id_project = $1, news_date = $2, title = $3, description = $4, photo = $5 WHERE id_news = $6', [id_project, news_date, title, description, photo, id_news], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send("News added");
        })
      } catch (error) {
        response.status(500).send({
          message: `Could not upload the file:. ${error}`,
        });
    }
}
const deleteNews = (request, response) => {
    const id_news = parseInt(request.params.id_news)
    pool.query('DELETE FROM news WHERE id_news = $1', [id_news], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Data news deleted");
    })
}
  module.exports = {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
  };


