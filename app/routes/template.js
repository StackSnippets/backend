const express = require("express");
const templateController = require("../controllers/templateController");

const router = express.Router();

router.get("/", templateController.templatesList);

router.get("/:id", templateController.templateDetail);

router.put("/create", templateController.createTemplate);

router.post("/:id/favorite", templateController.updateFavorites);

router.put("/:id", templateController.updateTemplate);

router.delete("/:id", templateController.deleteTemplate);

module.exports = router;
