'use strict';
module.exports = function(sequelize, DataTypes) {
  var Validation = sequelize.define('Validations', {
    validation_public_key: {
      type     : DataTypes.STRING,
      allowNull: false
    },
    ledger_hash: {
      type     : DataTypes.STRING,
      allowNull: false
    },
    reporter_public_key: {
      type     : DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      countByValidatorInLast24Hours: function() {
        return sequelize.query(
          'select sum(1), validation_public_key from "Validations" group by validation_public_key'
        ,{
          type: sequelize.QueryTypes.SELECT
        }).then(results => {
          return results.map(result => {
            return {
              validations_count: parseInt(result.sum),
              validation_public_key: results.validation_public_key
            }
          })
        })
      },

      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Validation;
};
