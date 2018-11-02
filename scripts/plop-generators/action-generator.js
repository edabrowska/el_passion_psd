module.exports = {
  description: 'Create action & reducer case.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Action name (camelcase), bitte:'
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Where to put it? Action & reducer filename.'
    }
  ],

  actions: [
    {
      type: 'append',
      path: '../src/store/actions/{{filename}}.js',
      pattern: /export default {/,
      template: '  {{camelCase name}}: actionCreator(\'{{constantCase name}}\'),'
    },
    {
      type: 'append',
      path: '../src/store/reducers/{{filename}}.js',
      pattern: /switch \(type\) \{/,
      templateFile: 'plop-templates/reducer-case.hbs'
    },
  ]
}
