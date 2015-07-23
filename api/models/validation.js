'use strict';
import moment from 'moment'

module.exports = function(sequelize, DataTypes) {
  var Validation = sequelize.define('Validations', {
    validation_public_key: {
      type     : DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^n([rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]){51}$/i
      }
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
          'select sum(1), validation_public_key from "Validations" where "createdAt" > ? group by validation_public_key'
        ,{
          replacements: [moment().subtract(1, 'days').toDate()],
          type: sequelize.QueryTypes.SELECT
        }).then(results => {
          return results.map(result => {
            return {
              validations_count: parseInt(result.sum),
              validation_public_key: result.validation_public_key
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
