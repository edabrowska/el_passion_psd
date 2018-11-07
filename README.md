# spark ⚡️

Boilerplate based on [next.js](https://github.com/zeit/next.js/) for web apps and static websites

## Features

- All stuff from [next.js](https://github.com/zeit/next.js/)
- Bundle Analyzer
- Service workers
- Files hashing
- Custom Node server
- [Sass](https://sass-guidelin.es/#about-sass) support with autoprefixing & [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [Minification](http://cssnano.co/) via [PostCSS](http://postcss.org/)
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [Redux](https://redux.js.org/)
- Plop code generators for: a) reducers; b) services (coming soon) 
- Testing with [jest](https://facebook.github.io/jest/) & [enzyme](http://airbnb.io/enzyme/)
- [Eslint](https://eslint.org/)
- [Sass lint](https://github.com/sasstools/sass-lint)
- [Commitizen](https://commitizen.github.io)
- [Automatic changelog](https://github.com/leonardoanalista/corp-semantic-release)
- [Storybook](https://storybook.js.org/)
- [Sentry's Raven.js Library](https://www.npmjs.com/package/raven-js)

## Quick start

1. make sure you have [nodejs](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/docs/install) installed
1. `yarn`
1. `yarn start`
1. `PORT=8888 yarn start` - if you want to start dev server on different port
1. Then visit [localhost:8000](http://localhost:8000/)

## Linking modules

This project is using `babel-plugin-root-import` to enable absolute linking for modules, using prefixes:

- `~` for `/components`
- `+` for `/styles`
- `-` for `/static`

```javascript
import MyComponent from '~/components/MyComponent'
import styles from '+/style.sass'
```

## Fetching data

To fetch data use `ajaxer` or `apiAjaxer` functions placed in `src/api/common`. See example in `src/api/index`.

If you want fetch data and add it to redux store use Services.
To prefetch data with SSR use `services` parameter in HOC `src/hoc/withLayout`. See example in `pages/index.js`.

## Services

### Why you should use services ?

Service is a function that fetches (with `ajaxer` or `apiAjaxer` function) and dispatches action when received data. 
Finally you will have:
- nice project structure without any chaos
- one fetch does one action
- one action does one reducer
- one import in component

### How to create a service?

1. Create in `src/api/index.js` a const with called ajaxer function in format like:
  ```javascript
  export const managePosts = {
    get: () => apiAjaxer('/posts'),
  }
  ```
For better project structure give a name with prefix `manage` for api objects with functions.

#### Add action for service

(*Note:* you should generate these autamatically! See: [Redux](#redux))

1. Create in `src/store/actions` a file with name what describe group for actions. This actions will call reducer to modify data in redux-store object.  
For better project structure give one name for actions, reducer and redux-store state key (`src/store/actions/posts.js` - `state.posts`).

1. Add import to created file
  ```javascript
  import { actionCreator } from '~/store/actions/common'
  ```

1. Create an object with export default:
  ```javascript
  export default {
    set: actionCreator('SET_POSTS'),
  }
  ```
### Create reducer to listen for the action

(*Note:* you should generate these autamatically! See: [Redux](#redux))
  
1. Create in a file `src/store/reducers` with same file name as the actions (`src/store/reducers/posts.js`)

1. Add your reducer function with case when type is like `actionCreator` function parameter:
  ```javascript
  export default (state = {}, action) => {
    const { payload, type } = action
    switch (type) {

      case 'SET_POSTS':
        return payload

      default:
        return state
    }
  }
  ```

1. Add your reducer to redux-store:
  ```javascript
  import postsReducer from '~/store/reducers/posts'

  export default combineReducers({
    posts: postsReducer,
  })
  ```

1. Add file with same name to `src/services` (`src/services/posts`)

1. Import created ajaxer, actions objects & fetchAndDispatch function

1. And finally create you service object:
  ```javascript
  import fetchAndDispatch from '~/services/common'
  import { managePosts } from '~/api'
  import postsActions from '~/store/actions/posts'

  export const handlePosts = {
    get: fetchAndDispatch(managePosts.get, postsActions.set)
  }
  ```
For better project structure give a name with prefix `handle` for service objects.


Now you can use service in `services` parameter in `withLayout` HOC for SSR prefetch.  
For client side - where you have redux function `dispatch`:
```javascript
componentDidMount () {
  handlePosts.get(null, this.props.dispatch)
}
```

## Redux

Is pre-configured. All actions, reducers & selectors are in `src/store`.

If you'd rather not have it - just remove `src/store` & `src/hoc/withReduxStore.js`, update `withLayout.js` and `package.json`

### Generate reducers & actions from CLI

There's a plop generator that can create standard actions and reducers for you. Use yarn script to run it:

```bash
yarn generate:reducer
```
A short wizzard will start. Prompting you - among others - for the reducer name.
 
The generator will:
* Create a reducer file
* Append it to redux store at `src/store/reducers/index.js`
* Create actions file
* Add any of the CRUD actions you specified both to the reducer function and to the actions file.

It's highly recommended to create reducers and actions using this generator, as it uses standard naming conventions
that we've agreed upon. (If you don't comply with the naming conventions that the generator uses,
be prepared to have your merge request rejected.)

#### Generate single action

You can also generate an action using:

```bash
yarn generate:action
```

This generator will add a single action and a single action handler to existing actions/reducer files.

## Components

You can generate components using:
 
```bash
yarn generate:component
```

It will create:
* component file (you can choose between function and class)
* test file containing a basic display test and a snapshot test
* sass file
* storybook file (optional, recommended)

Afterwards the script will run all tests, and generate snapshot.

Again - Generator uses standard naming conventions that we've agreed upon (including BEM). 
(If you mess with the conventions, be prepared to have your merge request rejected.)

## Default components

### ImageTag

Component create `img` tag with hashed image path and expect that any raster image will have a corresponding `@2x`version, e.g. `image.png` & `image@2x.png` (for  `*.svg` not needed).

### Link

Is's a standard NextLink but with tag `<a>` (better for SEO)


## Styles

- Files grouped by [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)
- Included [Normalize.css](https://necolas.github.io/normalize.css/)

### Links with hash

In styles for style with url you can use `get-asset-url` or to get custom path from static folder `get-static-file-path` (see `styles/abstracts/functions.sass`):
- `background-image: get-asset-url('image.png')`
- `src: url(get-static-file-path('fonts/font.woff'))`

### Links without hash

Just use `background-image: '/static/image.png'`

### BEM

We recommend to create your styles using BEM structure.
- (What is BEM?)[http://getbem.com/introduction/]
- [bemCx](https://www.npmjs.com/package/bem-modifiers) - Simple utility inspired by classnames that glues class with --modifiers.

## Icons

Icons are shipped as webfonts generated from svgs by the script: 

```bash
yarn icofont
```

It takes all SVGs in the `/icons/` directory, builds webfont files, and puts them in the `/static/icons/` directory.
Finally, a "@font-face" file is generated: `styles/base/icofont.scss`. It includes all the icons
found in `/icons/` dir.

### Adding an icon

1. Put the SVG in `/icons/` directory (the name of the file will be the icon class with an `.i-` prefix)
1. Run the script: `yarn icofont`
1. Celebrate

### Icon good practices

Rules for the designer (make sure he or she realizes those):
* Icons should be made out of SVGs of uniform size (ie. height).
* The size of the SVGs should correspond to the grid size for the icon.
* Symbols in the SVG should conform to that grid and leave 2-3 grid units padding (depending on the shape).
* Symbols should be centered in the SVG but it's more important for them to conform to the grid.

(conform to the grid == lay exactly at the grid points, snap to grid at every possible point)

Rules for the developer:
* For pixel-perfect icons use font size that is equal to `SVG grid height * n`.
* Remember: font-size corresponds to the SVG size (not the size of symbol within).
* Icons tend not to be horizontally pixel-perfect in 50% of cases (depending on browser);
  to mitigate this you can use `margin-left: .5px`, but remember to debug across all browsers.

## Deployment

- `yarn start` - if you want to use node server
- `yarn export` - for static export (you need to declare all exported pages in `exports-map.js`)

## Testing

You can add your test in `__tests__` folder. Snapshots created automatically after run.

- `yarn t` to run tests in watch mode.
- `yarn test-ci` for a single run with coverage reporting. Useful for CI.

## Linting

Run `yarn lint` for a linting report. Linter will also be run before commit.

## Storybook

[Storybook](https://storybook.js.org/) is a UI development environment, which also can serve as styleguide.

Run `yarn storybook` to start the development mode - the Storybook will be available at [localhost:9001](http://localhost:6006/)

## Committing

This repo uses [commitizen](https://commitizen.github.io), so instead of `git commit ...` use `yarn cm` or install commitizen globally and then use `git cz`.

Each commit triggers `yarn lint`.

## Changelog

To generate changelog, tag a new version, and push to code to remote, run `$ yarn release`.

## Bundle analysis

- `yarn analyze` - Build and analyze both server and browser
- `yarn analyze:server` - Build and analyze the back end server bundle
- `yarn analyze:browser` - Build and analyze the front end browser bundle

## Error tracking

[Raven.js](https://www.npmjs.com/package/raven-js) is the official browser JavaScript client for [Sentry](https://sentry.io). It automatically reports uncaught JavaScript exceptions triggered from a browser environment, and provides a rich API for reporting your own errors.

Add your config like - `https://<key>@sentry.io/<project>` in `config/production.env`

# Per environment config

Based on [dotenv](https://www.npmjs.com/package/dotenv) package.

Any secret config like password, api keys should be placed in .env file in projects root directory.
Any public config like external api url, server config should be placed in `/config/{environment}`.

Specified variables can be accessed like ... `process.env.SOME_VARIABLE`

# Static text content and internationalization (i18n)

I18next is used for placing static text within pages. Use this mechanism regardless of whether you think your
app will be translated into more than one language.  

Put text/locale on pages like this: 

```jsx harmony
import { translate } from 'react-i18next'

@translate(['common', 'errors']) //namespaces = locale files, 1st one will be default 
class MeinComponent extends React.Component {
  render () {
    const { t } = this.props //translate prop provided by translate hoc

    return <div>
      <p>
        Text from common namespace (default): <b>{t('button.ok')}</b>.
        Text from errors namespace: <b>{t('errors:you_dont_exist')}</b>.
      </p>
    </div>
  }
}
```

Locale strings are placed in locale/filename_aka_namespace.yml

### More on i18next

Be aware that i18next is quite powerful. **Do not reinvent the wheel!** Use what i18next provides.
Ex. if you expect to support more than one language, do not simply concatenate strings with parameters,
as the resulting translation may have different word order in different languages. Instead use *interpolation* features
built into i18next instead (or the `Trans` component).
 
Besides *interpolation*, i18next does a great job with *pluralization* and other advanced locale stuff for you.

*Note on missing locales:* Do not copy English locale to other language packages. I18next will fall back English
in case of missing locale key for other language, and **will report it**. However, if you put an English "placeholder"
in a language locale file, the locale key will not be formally missing, and **will not be reported!**

Learn shit before you use it: [i18next for react](https://react.i18next.com/) & [i18next](https://www.i18next.com/).
