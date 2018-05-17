const Template = require("../models/template");

exports.templatesList = function(req, res) {
  res.send("Templates List");
};

exports.templateDetail = function(req, res) {
  res.send("Single Template");
};

exports.createTemplate = function(req, res) {
  res.send("Create Template");
};

exports.updateTemplate = function(req, res) {
  res.send("Update Template");
};

exports.addToFavorites = function(req, res) {
  res.send("Keep favorite count");
};

exports.deleteFromFavorites = function(req, res) {
  res.send("Update favorite count");
};
