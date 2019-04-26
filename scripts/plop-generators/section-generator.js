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
    const type = 'add'
    const steps = [
      {
        type,
        path: '../src/sections/{{properCase name}}/{{properCase name}}Section.js',
        templateFile: `plop-templates/component-${componentType}.hbs`,
        data: {
          nameSuffix: 'Section',
          includeSuffixInClass: true,
          directory: 'sections',
          shardSuffix: 'Section',
        }
      },
      {
        type,
        path: '../src/sections/{{properCase name}}/{{properCase name}}Section.shards.js',
        templateFile: 'plop-templates/component-shards.hbs',
        data: {
          nameSuffix: 'Section',
          shardSuffix: 'Section'
        }
      },
      {
        type,
        path: '../__tests__/sections/{{properCase name}}Section.test.js',
        templateFile: 'plop-templates/component-test.hbs',
        data: {
          nameSuffix: 'Section',
          directory: 'sections'
        }
      }
    ]

    return steps
  }
}
