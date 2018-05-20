const Template = require("../models/template");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

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

exports.createTemplate = [
  body("name")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Name must have at least 3 characters.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("description")
    .optional()
    .isLength({ min: 5 })
    .trim()
    .withMessage("Description must be specified.")
    .isAlphanumeric()
    .withMessage("Description has non-alphanumeric characters."),
  sanitizeBody("code")
    .trim()
    .escape(),
  sanitizeBody("name")
    .trim()
    .escape(),
  sanitizeBody("description")
    .trim()
    .escape(),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response = {
        status: "failure",
        errors: errors.array()
      };
      res.json(response);
      return;
    } else {
      const template = new Template({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description
      });
      template.save(function(err) {
        if (err) return;
        const response = {
          status: "success",
          result: "User added successfully"
        };
        res.status(201).json(response);
      });
    }
  }
];

exports.updateTemplate = [
  body("name")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Name must have at least 3 characters.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("description")
    .optional()
    .isLength({ min: 5 })
    .trim()
    .withMessage("Description must be specified.")
    .isAlphanumeric()
    .withMessage("Description has non-alphanumeric characters."),
  sanitizeBody("code")
    .trim()
    .escape(),
  sanitizeBody("name")
    .trim()
    .escape(),
  sanitizeBody("description")
    .trim()
    .escape(),
  function(req, res) {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response = {
        status: "failure",
        errors: errors.array()
      };
      res.json(response);
      return;
    } else {
      Template.findByIdAndUpdate(id, req.body, function(err, result) {
        if (err) return;
        const response = {
          status: "success",
          result
        };
        res.json(response);
      });
    }
  }
];

exports.deleteTemplate = function(req, res) {
  const deleteId = {
    _id: req.params.id
  };
  Template.deleteOne(deleteId, function(err) {
    if (err) res.json(err);
    const response = {
      status: "success",
      result: "Template has been deleted successfully"
    };
    res.json(202).json(response);
  });
};

exports.updateFavorites = function(req, res) {
  res.send("Keep favorite count");
};
