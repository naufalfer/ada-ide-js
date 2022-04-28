const express = require("express");
const router = express.Router();
const type = require('../controller/type');
const transfermethod = require('../controller/transfermethod');
const project = require('../controller/project');
const news = require('../controller/news');
const donation = require('../controller/donation');

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

//News routes
router.get("/news", news.getNews);
router.get("/news/:id_news", news.getNewsById);
router.put("/news/:id_news", news.updateNews);
router.post("/news", news.createNews);
router.delete("/news/:id_news", news.deleteNews);

//Donation routes
router.get("/donation", donation.getDonation);
router.get("/donation/:id_donation", donation.getDonationById);
router.post("/donation", donation.createDonation);
router.delete("/donation/:id_donation", donation.deleteDonation);

module.exports = router;