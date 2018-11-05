module.exports = {
  description: 'Ein wunderbar Komponengenerator.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name please:'
    },
    {
      type: 'list',
      name: 'componentType',
      message: 'What kind of component would you like to create?',
      choices: [
        'class',
        'function'
      ]
    },
    {
      type: 'confirm',
      name: 'includeStorybook',
      message: 'Would you like to create a Storybook showcase?',
      default: true
    }
  ],

  actions: function ({ componentType, includeStorybook }) {

    const steps = [
      {
        type: 'add',
        path: '../src/components/{{properCase name}}.js',
        templateFile: `plop-templates/component-${componentType}.hbs`
      },
      {
        type: 'add',
        path: '../__tests__/{{properCase name}}.test.js',
        templateFile: 'plop-templates/component-test.hbs'
      },
      {
        type: 'add',
        path: '../styles/components/{{kebabCase name}}.sass',
        template: '.{{kebabCase name}}\n  '
      },
      {
        type: 'modify',
        path: '../styles/main.sass',
        pattern: '// 5. Components\n// --',
        template: '// 5. Components',
        separator: ''
      },
      {
        type: 'append',
        path: '../styles/main.sass',
        pattern: '// 5. Components\n',
        template: '@import components/{{kebabCase name}}\n',
        separator: ''
      }
    ]

    if (includeStorybook) {
      steps.push({
        type: 'add',
        path: '../stories/{{properCase name}}_component.stories.js',
        templateFile: 'plop-templates/component-storybook.hbs'
      })
    }

    return steps
  }
}
