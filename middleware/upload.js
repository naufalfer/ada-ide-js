// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __basedir = dirname(__filename);

const util = require("util");
const multer = require("multer");

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, __basedir + "/resources");
  },
  filename: (request, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;