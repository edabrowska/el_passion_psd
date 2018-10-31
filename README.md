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

Service it's a function what fetch (with `ajaxer` or `apiAjaxer` function) and dispatch action with received data. Finally you will have:
- nice project structure without any chaos
- one fetch do one action
- one action do one reducer
- one import in component

### How to create a service?

1. Create in `src/api/index.js` a const with called ajaxer function in format like:
  ```javascript
  export const managePosts = {
    get: () => apiAjaxer('/posts'),
  }
  ```
For better project structure give a name with prefix `manage` for api objects with functions.

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
1. Create in `src/store/reducers` a file with same as actions file name (`src/store/reducers/posts.js`)

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

Is pre-configured. All actions, reducers & selectors are in `src/store`. There are examples for you.

If you'd rather not have it - just remove `src/store` & `src/hoc/withReduxStore.js`, update `withLayout.js` and `package.json`

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

We recommend you to create your styles using BEM structure.
- (What is BEM?)[http://getbem.com/introduction/]
- [bemCx](https://www.npmjs.com/package/bem-modifiers) - Simple utility inspired by classnames that glues class with --modifiers.

## Default components

### ImageTag

Component create `img` tag with hashed image path and expect that any raster image will have a corresponding `@2x`version, e.g. `image.png` & `image@2x.png` (for  `*.svg` not needed).

### Link

Is's a standard NextLink but with tag `<a>` (better for SEO)

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
