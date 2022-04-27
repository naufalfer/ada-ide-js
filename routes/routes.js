const express = require("express");
const router = express.Router();
const type = require('../controller/type');
const transfermethod = require('../controller/transfermethod');
const project = require('../controller/project');

//Type routes
router.get("/type", type.getType);
router.get("/type/:id_type", type.getTypeById);
router.put("/type/:id_type", type.updateType);
router.post("/type", type.createType);
router.delete("/type/:id_type", type.deleteType);

//Transfer Method routes
router.get("/transfermethod", transfermethod.getTransferMethod);
router.get("/transfermethod/:id_transfer_method", transfermethod.getTransferMethodById);
router.put("/transfermethod/:id_transfer_method", transfermethod.updateTransferMethod);
router.post("/transfermethod", transfermethod.createTransferMethod);
router.delete("/transfermethod/:id_transfer_method", transfermethod.deleteTransferMethod);

//Project file routes
router.get("/project", project.getProject);
router.get("/project/:id_project", project.getProjectById);
router.put("/project/:id_project", project.updateProject);
router.post("/project", project.createProject);
router.delete("/project/:id_project", project.deleteProject);

module.exports = router;