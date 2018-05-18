const express = require("express");
const templateController = require("../controllers/templateController");

const router = express.Router();

router.get("/", templateController.templatesList);

router.get("/:id", templateController.templateDetail);

router.post("/:id/favorite", templateController.updateFavorites);

router.put("/:id", templateController.updateTemplate);

module.exports = router;
