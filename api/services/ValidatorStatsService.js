
export default class ValidatorStatsService {

  static getValidationsInLast24Hours() {

    return new Promise((resolve, reject) => {

      database.Validators.findAll().then(validators => {

        resolve(validators.map(validator => {
          return {
            id: validator.id,
            validation_public_key: validator.validation_public_key,
            validations_count: 4
          }
        }))
      })
    })
  }
}

