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

  actions: function ({ componentType }) {
    const steps = [
      {
        type: 'add',
        path: '../src/sections/{{properCase name}}Section.js',
        templateFile: `plop-templates/component-${componentType}.hbs`,
        data: {
          nameSuffix: 'Section',
          includeSuffixInClass: true
        }
      },
      {
        type: 'add',
        path: '../__tests__/sections/{{properCase name}}Section.test.js',
        templateFile: 'plop-templates/component-test.hbs',
        data: {
          nameSuffix: 'Section'
        }
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
