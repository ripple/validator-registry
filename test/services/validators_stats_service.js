import assert from 'assert'
import 'sails-test-helper'

describe('ValidatorStatsService', () => {

  before(done => {
    database.Validations.create({
      validation_public_key: 'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7',
      reporter_public_key: 'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7',
      ledger_hash: '282A4D3E606EAE5E48F225610914B8D08CDEA1E3636EC3405634E22140D324D2'
    })
    .then(() => done())
  })

  it('#getValidationsInLast24Hours should list for all validators', done => {

    ValidatorStatsService.getValidationsInLast24Hours().then(validators=> {

      validators.forEach(validator => {
        assert(validator.id)
        assert(validator.validation_public_key)
        assert(validator.validations_count)
      })

      done()
    })
    .catch(error => {
      console.log('ERROR', error)
    })
  })
})

