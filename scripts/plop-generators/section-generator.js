module.exports = {
  description: 'Ein wunderbar Sectiongenerator.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Section name please:'
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
  ],

  actions: function ({ componentType, includeStorybook, ...params }) {
    const steps = [
      {
        type: 'add',
        path: '../src/sections/{{properCase name}}Section.js',
        templateFile: `plop-templates/section-${componentType}.hbs`
      },
      {
        type: 'add',
        path: '../__tests__/sections/{{properCase name}}Section.test.js',
        templateFile: 'plop-templates/section-test.hbs'
      },
      {
        type: 'add',
        path: '../styles/sections/{{kebabCase name}}-section.sass',
        template: '.{{kebabCase name}}-section\n  '
      },
      {
        type: 'modify',
        path: '../styles/main.sass',
        pattern: '// 5. Page sections\n// --',
        template: '// 5. Page sections',
        separator: ''
      },
      {
        type: 'append',
        path: '../styles/main.sass',
        pattern: '// 5. Page sections\n',
        template: '@import sections/{{kebabCase name}}-section\n',
        separator: ''
      }
    ]

    return steps
  }
}
