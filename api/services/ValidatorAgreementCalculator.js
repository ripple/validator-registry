
export default class ValidatorAgreementCalculator {

  static async computeCorrelationIndex(validators, begin, end) {

    var query = 'select num.validation_public_key , num.date_validated , num.num_validated_ledger, denom.denom_validated_ledger, cast(num.num_validated_ledger/ denom.denom_validated_ledger as float) as pct_validated_ledger from ( select b.validation_public_key , to_char(b."createdAt",\'yyyy-MM-dd\')  date_validated, count(distinct( b.ledger_hash)) num_validated_ledger from  "Validations" b where exists (select a.ledger_hash, count(distinct(a.validation_public_key))  rowcount from "Validations" a where a."createdAt" >= \'2015-07-13\' and a."createdAt" < \'2015-07-14\' and a.validation_public_key in (\'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7\',\'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj\',\'n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C\', \'n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS\', \'n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA\') and a.ledger_hash = b.ledger_hash group by a.ledger_hash having count(distinct(a.validation_public_key)) >= 3) group by b.validation_public_key, to_char(b."createdAt",\'yyyy-MM-dd\')) num join (select to_char(c."createdAt",\'yyyy-MM-dd\') as date_validated, count(distinct( c.ledger_hash)) as denom_validated_ledger from "Validations" c where c.validation_public_key in (\'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7\',\'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj\',\'n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C\', \'n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS\',\'n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA\') and c."createdAt" >= \'2015-07-13\' and c."createdAt" < \'2015-07-14\' group by to_char(c."createdAt",\'yyyy-MM-dd\') having count(distinct(c.validation_public_key)) >= 3) denom  on num.date_validated = denom.date_validated;'

    var result = await database.sequelize.query(query)

    var validators = {}

    result[0].forEach(validator => {

      var numerator = parseFloat(validator.num_validated_ledger)
      var denominator = parseFloat(validator.denom_validated_ledger)

      validators[validator.validation_public_key] = numerator / denominator
    })

    return validators
  }
}

