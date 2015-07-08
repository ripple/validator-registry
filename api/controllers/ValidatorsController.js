/**
 * ValidatorsController
 *
 * @description :: Server-side logic for managing validators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `ValidatorsController.index()`
   */
  index: function (req, res) {

    ValidatorStatsService.getValidationsInLast24Hours().then(validators => {

      return res.json({
        validators: validators
      })
    })
  },


  /**
   * `ValidatorsController.show()`
   */
  show: function (req, res) {

    database.Validators.findOne({
      where: {
        validation_public_key: req.params.validation_public_key
      }
    })
    .then(validator => {
      return res.json({
        validator: validator ? validator.toJSON() : {}
      })
    })
  },


  /**
   * `ValidatorsController.payouts()`
   */
  payouts: function (req, res) {
    return res.json({
      todo: 'payouts() is not implemented yet!'
    });
  }
};

