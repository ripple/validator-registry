'use strict';
module.exports = (sequelize, DataTypes) => {
  const CorrelationScores = sequelize.define('CorrelationScores', {
    cluster: {
      type     : DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        areValidationPublicKeys: (cluster) => {
          cluster.forEach(validationPublicKey => {
            if (validationPublicKey.length !== 52) {
              throw new Error('only ripple validation public keys allowed')
            }
          })
        }
      }
    },
    coefficients: {
      type     : DataTypes.JSON,
      allowNull: false
    },
    date: {
      type     : DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'date must be formatted as YYYY-MM-DD'
        }
      }
    },
    quorum: {
      type     : DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    getterMethods: {
      coefficients: function() {
        var coefficients = this.getDataValue('coefficients')
        Object.keys(coefficients).forEach(publicKey => {
          coefficients[publicKey] = parseFloat(coefficients[publicKey])
        })
        return coefficients
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CorrelationScores;
};
