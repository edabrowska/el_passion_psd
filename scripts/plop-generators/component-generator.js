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
    const type = 'add'

    let outermostComponent = includeContainer ? 'Container' : 'View'
    if (includeGql) {
      outermostComponent = 'Gql'
    }

    const steps = [
      {
        type,
        path: '../src/components/{{properCase name}}/{{properCase name}}View.js',
        templateFile: 'plop-templates/component-function.hbs',
        data: {
          nameSuffix: 'View',
          directory: 'components'
        }
      },
      {
        type,
        path: '../src/components/{{properCase name}}/{{properCase name}}.shards.js',
        templateFile: 'plop-templates/component-shards.hbs',
        data: {
          nameSuffix: 'View'
        }
      },
      {
        type,
        path: '../__tests__/components/{{properCase name}}View.test.js',
        templateFile: 'plop-templates/component-test.hbs',
        data: {
          nameSuffix: 'View',
          directory: 'components'
        }
      },
      {
        type,
        path: '../src/components/{{properCase name}}/index.js',
        templateFile: 'plop-templates/component-export.hbs',
        data: {
          nameSuffix: outermostComponent
        }
      }
    ]

    if (includeGql) {
      steps.push({
        type,
        path: '../src/components/{{properCase name}}/{{properCase name}}Gql.js',
        templateFile: 'plop-templates/component-gql.hbs',
        data: {
          renderComponentSuffix: includeContainer ? 'Container' : 'View'
        }
      })
    }

    if (includeContainer) {
      steps.push({
        type,
        path: '../src/components/{{properCase name}}/{{properCase name}}Container.js',
        templateFile: 'plop-templates/component-function.hbs',
        data: {
          nameSuffix: 'Container',
          renderViewComponent: true,
          directory: 'components'
        }
      })
    }

    if (includeStorybook) {
      steps.push({
        type,
        path: '../stories/{{properCase name}}_component.stories.js',
        templateFile: 'plop-templates/component-storybook.hbs'
      })
    }

    if (testContainer) {
      steps.push({
        type,
        path: '../__tests__/components/{{properCase name}}Container.test.js',
        templateFile: 'plop-templates/component-test.hbs',
        data: {
          nameSuffix: 'Container',
          skipSnapshot: true,
          directory: 'components'
        }
      })
    }

    return steps
  }
}
