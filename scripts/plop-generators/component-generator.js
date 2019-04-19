module.exports = {
  description: 'Ein wunderbar Komponengenerator.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name please:'
    },
    {
      type: 'confirm',
      name: 'includeStorybook',
      message: 'Would you like to create a Storybook showcase?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeContainer',
      message: 'Would you like to create a container component?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeGql',
      message: 'Would you like to create a graphQL query wrapper component?',
      default: true
    },
    {
      type: 'confirm',
      name: 'testContainer',
      message: 'Would you like to add the container component test?',
      default: true
    }
  ],

  actions: function ({ componentType, includeStorybook, includeGql, includeContainer, testContainer }) {

    const steps = [
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/{{properCase name}}View.js',
        templateFile: 'plop-templates/component-function.hbs',
        data: {
          nameSuffix: 'View'
        }
      },
      {
        type: 'add',
        path: '../__tests__/components/{{properCase name}}/{{properCase name}}View.test.js',
        templateFile: 'plop-templates/component-test.hbs',
        data: {
          nameSuffix: 'View'
        }
      },
      {
        type: 'add',
        path: '../styles/components/{{kebabCase name}}.sass',
        template: '.{{kebabCase name}}\n  '
      },
      {
        type: 'modify',
        path: '../styles/main.sass',
        pattern: '// 6. Components\n// --',
        template: '// 6. Components',
        separator: ''
      },
      {
        type: 'append',
        path: '../styles/main.sass',
        pattern: '// 6. Components\n',
        template: '@import components/{{kebabCase name}}\n',
        separator: ''
      }
    ]

    if (includeGql) {
      steps.push({
        type: 'add',
        path: '../src/components/{{properCase name}}/{{properCase name}}Gql.js',
        templateFile: 'plop-templates/component-gql.hbs',
        data: {
          renderComponentSuffix: includeContainer ? 'Container' : 'View'
        }
      })
    }

    if (includeContainer) {
      steps.push({
        type: 'add',
        path: '../src/components/{{properCase name}}/{{properCase name}}Container.js',
        templateFile: 'plop-templates/component-class.hbs',
        data: {
          nameSuffix: 'Container',
          renderViewComponent: true
        }
      })
    }

    if (includeStorybook) {
      steps.push({
        type: 'add',
        path: '../stories/{{properCase name}}_component.stories.js',
        templateFile: 'plop-templates/component-storybook.hbs'
      })
    }

    if (testContainer) {
      steps.push({
        type: 'add',
        path: '../__tests__/components/{{properCase name}}/{{properCase name}}Container.test.js',
        templateFile: 'plop-templates/component-test.hbs',
        data: {
          nameSuffix: 'Container',
          skipSnapshot: true
        }
      })
    }

    return steps
  }
}
