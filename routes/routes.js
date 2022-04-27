const express = require("express");
const router = express.Router();
const type = require('../controller/type');

router.get("/type", type.getType);
router.get("/type/:id_type", type.getTypeById);
router.put("/type/:id_type", type.updateType);
router.post("/type", type.createType);
router.delete("/type/:id_type", type.deleteType);

module.exports = router;