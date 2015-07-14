import 'sails-test-helper'
import assert from 'assert'
import moment from 'moment'

describe('ValidatorAgreementCalculator', () => {

  it('.computeCorrelationIndex(validationPublicKeys, validators, start, end) should return a set of common validations', done => {

    var ledgerHashes = [
      'D9B5619DC1B2C91298798AE8965408719A8958857152464BAD152832E18E0F2D',
      '2B6550CB0AEC4E143018C0191E017DF038EC8395B554DAF29921DC8F25AE4EAA',
      '651F7087E6888F9640C3ED8E1FEE25E11FE7D86D84D65CE70EB713ED8F5D480C',
      '80B4EE4C8099ED4D063DCBDF59F1255BC80DEE3D01F2DA7472A1FD3C15954A03',
      'E3EFAD8D51FD6373D43FED25F08354CE80BB2CA0069C4B507D819B5A1BB5D997',
      '4007AC2A0DDDCA832D9B5554627276AAB5B08E0872B4A21D7246F5BAADC3C5FA',
      'EA5EF786FC1C8E818D97D6D4520C6693F45DE7BE015C4DE6B978E6B50BE494CD',
      '98BFED205328D7326FF5769107629D3256DD9F8336136A5EA8FCDA6D8E9091A4',
      '4831990A1F359B939A7E999FA920E673EC10C71F388D6D210EC282F2378D6636',
      '3549847912CF28E81317AA19BE9A7B932F45EBF100766BFD15CB085CBA650966',
      '67A7996964F1A2ABD319EE94F596B417B526D69DF9A65305DB3CDFB5521739C9'
    ]

    var alphaCluster = [
      'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7',
      'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj',
      'n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C',
      'n9KiYM9CgngLvtRCQHZwgC2gjpdaZcCcbt3VboxiNFcKuwFVujzS',
      'n9LdgEtkmGB9E2h3K4Vp7iGUaKuq23Zr32ehxiU8FWY7xoxbWTSA',
    ]

    var otherValidators = {
      'n9Kk6U5nSF8EggfmTpMdna96UuXWAVwSsDSXRkXeZ5vLcAFk77tr': 5,
      'n9MbvNyYhkxocST1msrcrj2xkvF8oWBGKTVb2RqtFgTk8psiyrZz': 6,
      'n9KDJnMxfjH5Ez8DeWzWoE9ath3PnsmkUy3GAHiVjE7tn7Q7KhQ2': 7,
      'n9KcuH7Y4q4SD3KoS5uXLhcDVvexpnYkwciCbcX131ehM5ek2BB6': 8,
      'n9KDWeLbHfZuXDfdJoe5wVXtHxLwWVTp5QE7PnWL6LctqoaFsVox': 9
    }

    // create five ripple labs validators 
    // create five non-ripple labs validators

    // create ten validations for each of ripple labs validators
    // create five,six,seven,eight,and nine validations for non-ripple labs validators

    ValidatorAgreementCalculator.computeCorrelationIndex().then(validations => {
      console.log("RESULT", validations)

      alphaCluster.forEach(validationPublicKey => {
        assert.strictEqual(validations[validationPublicKey], 1)
      })

      var i = 5.0

      Object.keys(otherValidators).forEach(validationPublicKey => {
        assert.strictEqual(validations[validationPublicKey], i / 10.0)
        i++;
      })

      done()
    })
    .catch(error => {
      console.log('ERROR', error)
    })
  })
})

