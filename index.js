const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes")

const app = express();

global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/", (request, response) => {
    response.json({
        info: 'Hello world!'
    });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});

