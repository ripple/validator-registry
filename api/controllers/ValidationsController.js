/**
 * ValidationsController
 *
 * @description :: Server-side logic for managing validations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var db = require('../services/database');
const Checkit = require('checkit')

const validationCheckit = new Checkit({
  validation_public_key: 'required',
  ledger_hash: 'required',
  reporter_public_key: 'required',
})

module.exports = {

  /**
   * `ValidationsController.create()`
   */
  create: function (req, res) {

    validationCheckit.run(req.body)
    .then(() => {
      res.status(200).send('OK')

      db.Validations.create({
        validation_public_key: req.validation_public_key,
        ledger_hash: req.body.ledger_hash,
        reporter_public_key: req.body.reporter_public_key
      })
      .catch(error => {
        console.error(error)
      })
    })
    .catch(error => {
      console.error(error)
      res.status(400).json(error)
    })
  },


  /**
   * `ValidationsController.index()`
   */
  index: function (req, res) {
    var validation_public_key = req.params.validation_public_key

    if (!validation_public_key) {
      return res.status(400).json({
        message: "Requires 'validation_public_key'"
      })
    }

    database.Validations.findAll({
      where: {
        validation_public_key: validation_public_key
      }
    })
    .then(validations => {
      return res.json({
        validations: validations
      })
    })
  },


  /**
   * `ValidationsController.show()`
   */
  show: function (req, res) {
    var ledger_hash = req.params.ledger_hash

    if (!ledger_hash) {
      return res.status(400).json({
        message: "Requires 'ledger_hash'"
      })
    }

    database.Validations.findAll({
      where: {
        ledger_hash: ledger_hash
      }
    })
    .then(validations => {
      return res.json({
        validations: validations
      })
    })
  }
};

