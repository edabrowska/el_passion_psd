module.exports = {
  description: 'Generate me a reducer, por favor.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Reducer name:'
    },
    {
      type: 'checkbox',
      name: 'actions',
      message: 'What actions would you like to include?',
      choices: [
        { name: 'SET_MAP  (overwrite all)', value: 'set' },
        { name: 'CREATE   (add item to list)', value: 'create' },
        { name: 'UPDATE   (modify list item)', value: 'update' },
        { name: 'DELETE   (delete item from list)', value: 'delete' },
      ]
    }
  ],

  actions: [
    {
      type: 'modify',
      path: '../src/store/reducers/index.js',
      pattern: /\nexport default combineReducers\(\{/,
      templateFile: 'plop-templates/reducer-import.hbs'
    },
    {
      type: 'append',
      path: '../src/store/reducers/index.js',
      pattern: /export default combineReducers\(\{\n/,
      template: '  {{camelCase name}}: {{camelCase name}}Reducer,',
      separator: ''
    },
    {
      type: 'add',
      path: '../src/store/reducers/{{camelCase name}}.js',
      templateFile: 'plop-templates/reducer.hbs'
    },
    {
      type: 'add',
      path: '../src/store/actions/{{camelCase name}}.js',
      templateFile: 'plop-templates/actions.hbs'
    }
  ],
}
