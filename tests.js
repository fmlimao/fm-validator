(() => {
  console.clear()

  class RetMock {
    error = false
    form = {}

    setCode () {}

    setError (error) {
      this.error = error
    }

    addField (field) {
      this.form[field] = {
        error: false,
        messages: []
      }

      return this
    }

    setFieldError (field, error) {
      this.form[field].error = error
      return this
    }

    addFieldMessage (field, message) {
      this.form[field].messages.push(message)
      return this
    }
  }

  const validator = require('./index')

  const validates = [
    { value: '', rule: 'required' },
    { value: 1, rule: 'between:3,5' },
    { value: true, rule: 'string' },
    { value: true, rule: 'integer' },
    { value: true, rule: 'array' },
    { value: true, rule: 'email' },
    { value: 1, rule: 'min:3' },
    { value: 10, rule: 'max:5' },
    { value: 'abc', rule: 'size:5' }
  ]

  for (const v of validates) {
    const ret = new RetMock()
    ret.addField('v')

    validator(ret, {
      v: v.value
    }, {
      v: v.rule
    }, {
      size: 'Tamanho do campo inválido. Tamanho: :size.'
    })

    console.log('\nret', ret.error, ret.form.v.error, ret.form.v.messages)
  }

  console.log()

  const m = {
    a: 1,
    b: 2
  }

  /**/console.log(Object.assign(m, {
    c: 3
  }))
})()
