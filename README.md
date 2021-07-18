# fm-validator

Um módulo para validar variáveis em sua aplicação.

Este módulo usa os pacotes [validatorjs](https://www.npmjs.com/package/validatorjs) e o [fm-json-response](https://www.npmjs.com/package/fm-json-response) como base.

## Instalação

```bash
npm i fm-validator --save
```

## Como usar

```javascript

const FmJsonResponse = require('fm-json-response');
const validator = require('fm-validator');

let ret = new FmJsonResponse();

try {
    ret.addFields(['name', 'email', 'password']);

    validator(ret, {
        name: 'A',
        email: 'email@email',
        password: '123',
    }, {
        name: 'required|string|min:3|max:128',
        email: 'required|string|email|max:128',
        password: 'required|string|min:6|max:32',
    });

    if (ret.error) {
        throw ret;
    }

    ret.addMessage('Login válido =)');
} catch (err) {
    ret.addMessage('Verifique todos os campos.');
}

console.dir(ret.generate(), { depth: null });
/*
{
  code: 400,
  error: true,
  messages: [ 'Verifique todos os campos.' ],
  form: {
    name: { error: true, messages: [ 'Valor muito curto. Mínimo: 3.' ] },
    email: { error: true, messages: [ 'E-mail inválido.' ] },
    password: { error: true, messages: [ 'Valor muito curto. Mínimo: 6.' ] }
  }
}
*/

```

