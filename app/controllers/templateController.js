const Template = require("../models/template");

exports.templatesList = function(req, res) {
  Template.find({}, function(error, result) {
    if (error) res.json({ error });
    res.json({ success: result });
  });
};

exports.templateDetail = function(req, res) {
  const id = req.params.id;
  Template.findOne({ _id: id }, function(error, result) {
    if (error) res.json({ error });
    res.json({ success: result });
  });
};

exports.createTemplate = function(req, res) {
  res.send("Create Template");
};

exports.updateTemplate = function(req, res) {
  res.send("Update Template");
};

exports.updateFavorites = function(req, res) {
  res.send("Keep favorite count");
};
