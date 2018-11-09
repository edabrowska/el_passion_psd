const reducerGeneratorActions = require('./reducer-generator').actions

module.exports = {
  description: 'Generate me a service, por favor.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Service file name:'
    },
    {
      type: 'checkbox',
      name: 'operations',
      message: 'Would you like to include some typical operations?',
      choices: [
        { name: 'GET      (fetch all)', value: 'get' },
        { name: 'CREATE   (post item)', value: 'create' },
        { name: 'UPDATE', value: 'update' },
        { name: 'DELETE', value: 'delete' },
      ]
    },
    {
      type: 'confirm',
      name: 'includeApi',
      message: 'Would you like to create api methods for the service?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'includeReducer',
      message: 'Would you like to create a corresponding reducer and actions file?',
      default: true,
    },
  ],

  actions: (params) => {
    const { includeApi, includeReducer } = params

    let actions = [
      {
        type: 'add',
        path: '../src/services/{{camelCase name}}.js',
        templateFile: 'plop-templates/service.hbs'
      }
    ]

    if (includeApi) {
      actions.push({
        type: 'append',
        path: '../src/api/index.js',
        templateFile: 'plop-templates/api.hbs'
      })
    }

    if (includeReducer) {
      params.actions = params.operations.map(operation => operation === 'get' ? 'set' : operation)

      actions = [
        ...actions,
        ...reducerGeneratorActions
      ]
    }

    return actions
  }

}
