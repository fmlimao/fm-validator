const messagesValidator = require('./validator-messages')
const Validator = require('validatorjs')

const FmValidate = function (ret, fields, rules, customMessages = {}) {
  const messages = Object.assign({}, messagesValidator, customMessages)
  const dataValidate = new Validator(fields, rules, messages)

  const fails = dataValidate.fails()
  const errors = dataValidate.errors.all()

  if (fails) {
    ret.setError(true)

    for (const field in errors) {
      const messages = errors[field]
      ret.setFieldError(field, true)

      for (const i in messages) {
        const message = messages[i]
        ret.addFieldMessage(field, message)
      }
    }

    ret.setCode(400)
    return false
  }

  return true
}

module.exports = FmValidate
