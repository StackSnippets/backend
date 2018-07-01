const Template = require("../models/template");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const HTTP_CODE = require("../../constants/httpStatus");

exports.templatesList = function(req, res) {
  Template.find({}, function(error, result) {
    if (error) res.json({ error });
    const response = {
      status: HTTP_CODE.HTTP_SUCCESS,
      result
    };
    res.json(response);
  });
};

exports.templateDetail = function(req, res) {
  const id = req.params.id;
  Template.findOne({ _id: id }, function(error, result) {
    if (error) res.json({ error });
    const response = {
      status: HTTP_CODE.HTTP_SUCCESS,
      result
    };
    res.json(response);
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
    .isString()
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
        status: HTTP_CODE.HTTP_FAILURE,
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
          status: HTTP_CODE.HTTP_SUCCESS,
          result: "Template added successfully"
        };
        res.status(201).json(response);
      });
    }
  }
];

exports.updateTemplate = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .trim()
    .withMessage("Name must have at least 3 characters."),
  body("description")
    .optional()
    .isLength({ min: 5 })
    .trim()
    .isString()
    .withMessage("Description must be specified."),
  sanitizeBody("code")
    .trim()
    .escape(),
  sanitizeBody("name")
    .trim()
    .escape(),
  sanitizeBody("description")
    .trim()
    .escape(),
  sanitizeBody("base").toBoolean(),
  function(req, res) {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response = {
        status: HTTP_CODE.HTTP_FAILURE,
        errors: errors.array()
      };
      res.json(response);
      return;
    } else {
      Template.findByIdAndUpdate(id, req.body, { new: true }, function(
        err,
        result
      ) {
        if (err) return;
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          result
        };
        res.status(202).json(response);
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
      status: HTTP_CODE.HTTP_SUCCESS,
      result: "Template has been deleted successfully"
    };
    res.status(202).json(response);
  });
};

exports.updateFavorites = [
  body("number")
    .isNumeric()
    .isIn([1, -1])
    .withMessage("Provide a valid number"),
  function(req, res) {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response = {
        status: HTTP_CODE.HTTP_FAILURE,
        errors: errors.array()
      };
      res.json(response);
      return;
    } else {
      const body = {
        $inc: {
          favorited_by: req.body.number
        }
      };
      Template.findOneAndUpdate(id, body, { new: true }, function(err, result) {
        if (err) res.json(err);
        const response = {
          status: HTTP_CODE.HTTP_SUCCESS,
          result
        };
        res.status(202).json(response);
      });
    }
  }
];
