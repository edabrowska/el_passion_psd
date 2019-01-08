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
- Plop code generators for:
  - compoents
  - reducers
  - services
- Testing with [jest](https://facebook.github.io/jest/) & [enzyme](http://airbnb.io/enzyme/)
- [Eslint](https://eslint.org/)
- [Sass lint](https://github.com/sasstools/sass-lint)
- [Commitizen](https://commitizen.github.io)
- [Automatic changelog](https://github.com/leonardoanalista/corp-semantic-release)
- [Storybook](https://storybook.js.org/)
- [Sentry's Raven.js Library](https://www.npmjs.com/package/raven-js)

## Legend

- [Quick start](#quick-start)
- [Linking modules](#linking-modules)
  - [App data handling layers](#app-data-handling-layers)
- [Fetching data - API layer](#fetching-data-api-layer)
- [Services - connecting ajax with redux](#services-connecting-ajax-with-redux)
- []()
  - [What belongs in a service?](#what-belongs-in-a-service)
  - [Creating a service](#creating-a-service)
- [API methods](#api-methods)
- [Redux: actions and reducers](#redux-actions-and-reducers)
  - [Adding single actions to redux](#adding-single-actions-to-redux)
- [Selectors](#selectors)
- [Components](#selectors)
- [Default components](#default-components)
  - [ImageTag](#imagetag)
  - [Link](#link)
- [Styles](#styles)
  - [Links with hash](#links-with-hash)
  - [Links without hash](#links-without-hash)
  - [BEM](#bem)
- [Icons](#icons)
  - [Adding an icon](#adding-an-icon)
  - [Icon good practices](#icon-good-practices)
- [Deployment](#deployment)
- [Testing](#testing)
- [Linting](#linting)
- [Storybook](#storybook)
- [Committing](#committing)
- [Changelog](#changelog)
- [Bundle analysis](#bundle-analysis)
- [Error tracking](#error-tracking)
- [Per environment config](#per-environment-config)
- [Static text content and internationalization (i18n)](#static-text-content-and-internationalization-i18n)
  - [More on i18next](#more-on-i18next)


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

# App data handling layers

For separation of concern the app business logic comprises of the following layers:

1. **services** - to do various business logic (especially ajax and redux dispatch)
1. **api** - to connect to backends (ajax)
1. **actions** - to communicate with redux store (redux)
1. **reducers** - redux store functions to operate on data before saving to store (redux)
1. **selectors** - simple functions to fetch stuff from store
1. **components** - view - react components, that update on store change (using @connect)

**Note:**

```

1–5 are business logic layers that build upon Redux.

3–4 is Redux.

If you build just a basic landing page, you won't need that advanced structure.

In such case you can get rid of all the layers except for components and (most likely) api.

To get rid of Redux: remove `src/store` & `src/hoc/withReduxStore.js`, update `withLayout.js` and `package.json`.

Otherwise - If you don't know redux, now would be the time to google it & and get a gist of it.

```

Besides those, there are a couple of other entities:
* **helpers** - general utilities
* **higher order components (HOC)** - react component wrappers for DRYness

## Fetching data - API layer

To fetch data use `ajaxer` or `apiAjaxer` functions placed in `src/api/common`. See example in `src/api/index`.

If you want fetch data and add it to redux store – use [Services](#services-connecting-ajax-with-redux).

To prefetch data with SSR – use `services` parameter in HOC `src/hoc/withLayout`. See example in `pages/index.js`.

## Services - connecting ajax with redux

A service uses API to fetch data from backend (with `ajaxer` or `apiAjaxer` function) and dispatches a redux
action when data arrives.

Simplest service only fetches data and dispatches action. So it can be a oneliner:

```javascript
export const handleDogs = {
  get: fetchAndDispatch(manageDogs.get, dogActions.setDogMap)
}
```
A service may fetch only - with no dispatching - if for some reason we don't want to update redux after fetch.
Likewise - there can be no fetch - for example when all we wan't to do is some browser side-effects
and then save data to redux (ex. log-out user: remove user cookie and dispatch action to unset currentUser from redux).

For better project structure service name should be prefixed with `handle-`.

## What belongs in a service?

* API calls
* handling API response
* dispatching actions with data from response
* client side operations like setting cookies, local storage I/O etc.

### Some [rules of thumb](https://www.collinsdictionary.com/dictionary/english/rule-of-thumb):
* when you create a component method that does something beyond the component concerns, consider
  whether that logic might belong in a service (especially if it involves dispatching an action!)
* parsing raw data from backend response belongs in API and NOT service, same goes with any "low-level" & generic
  operations


## Creating a service

Services live in the `src/services/` directory. They are grouped in files named after the entity they handle
(ie. User, Post, Task, Board, etc.).

To create a service run plop generator:

```bash
yarn generate:service
```

It will:
1. Ask for service name
1. Propose to include typical methods: GET, CREATE, UPDATE, DELETE
1. Ask whether you want to generate all the other layers corresponding to the service: actions, reducers, api methods

```
It's highly recommended to create modules using generators, as they use standard naming and structure conventions that we've agreed upon. (If you don't comply with the conventions, be prepared to have your merge request rejected.)
```

Generated service operations will be grouped in an object and exported. They will be basic
`fetchAndDispatch` services (take a look at `src/services/common.js` where `fetchAndDispatch` function is implemented)

**Note:**
```
Services assume the existence of corresponding actions and api methods.
If they don't exist (and you don't generate them) the service will crash for the lack of dependencies.
```

## API methods

API methods are just what you'd expect: ajax connectors to the backend (or any other remotes).

**Responsibilities**
* Defining API endpoints
* Handling requests
* Serializing response data (ex. jsonApi)
* Communicating errors to the outside (ie. services)
* Some generic errors can be handled here (but need to be communicated outside)

(by communicating errors we mean returning a rejected promise)

API methods are generated alongside services and shouldn't be omitted
(hardly any service will make sense without backend connection!).

## Redux: actions and reducers

_Actions_ are like events. They just have a **name** and carry some **data** (a.k.a. payload).
They live in `src/store/actions` and are quite boring.

_Reducers_ listen for actions. They transform the payload and put it in the redux store.
Once the redux store is updated by a reducer components that connect to the store will update (if neccessary).
Reducers live in `src/store/reducers`.

Both reducers and actions should be named in accordance to the service that uses them.
That's why it's easy to generate it all together with the service generator.

But if you just need the reducer and the actions you can generate these separately:

```bash
yarn generate:reducer
```

A short wizard will start. Prompting you - among others - for the reducer name.

**The generator will**:
* Create a reducer file
* Append it to redux store at `src/store/reducers/index.js`
* Create actions file
* Add any of the CRUD actions you specified both to the reducer function and to the actions file.

Again: for better project structure we use one name for services, actions,
reducer, and redux store key (`src/store/actions/posts.js` - `state.posts`).

#### Adding single actions to redux

You can add a single custom action to existing actions/reducer pair using:

```bash
yarn generate:action
```

This will:
1. Ask for action name.
1. Ask for reducer/actions file name (both files must exist).
1. Insert action into actions file.
1. Insert reducer case listening to given action.

Try to make action names meaningful.

## Selectors

Selectors are functions that retrieve particular fields from redux. You can find them in
`src/store/selectors.js`. They should be used in `@connect` to get data from store
in a uniform way. Selector always must be passed the `store` parameter (available in @connect).

## Components

You can generate components using:

```bash
yarn generate:component
```

**It will create**:
* component file (you can choose between function and class)
* test file containing a basic display test and a snapshot test
* sass file
* storybook file (optional, recommended)

Afterwards the script will run all tests, and generate snapshot.

Again - Generator uses standard naming conventions that we've agreed upon (including BEM).
(If you mess with the conventions, be prepared to have your merge request rejected.)

## Default components

### ImageTag

Component create `img` tag with hashed image path and expect that any raster image will have a corresponding `@2x` version, e.g. `image.png` & `image@2x.png` (for  `*.svg` not needed).

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
- [What is BEM?](http://getbem.com/introduction/)
- [bemCx](https://www.npmjs.com/package/bem-modifiers) - Simple utility inspired by [classnames](https://github.com/JedWatson/classnames) that glues class with --modifiers.

## Icons

Icons are shipped as webfonts generated from SVGs by the script:

```bash
yarn icofont
```

It takes all SVGs in the `/icons/` directory, builds webfont files, and puts them in the `/static/icons/` directory.
Finally, a "@font-face" file is generated: `styles/base/icofont.scss`. It includes all the icons
found in `/icons/` dir.

### Adding an icon

1. Put the SVG in `/icons/` directory (the name of the file will be the icon class with an `.i-` prefix)
1. Run the script: `yarn icofont`
1. Celebrate 🥳

### Icon good practices

#### Rules for the designer (make sure he or she realizes those):
* Icons should be made out of SVGs of uniform size (ie. height).
* The size of the SVGs should correspond to the grid size for the icon.
* Symbols in the SVG should conform to that grid and leave `2-3` grid units padding (depending on the shape).
* Symbols should be centered in the SVG but it's more important for them to conform to the grid.

(conform to the grid == lay exactly at the grid points, snap to grid at every possible point)

#### Rules for the developer:
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

Run `yarn storybook` to start the development mode - the Storybook will be available at [localhost:9001](http://localhost:6006/).

Generating components with the plop generator will add a Storybook page automatically for you
(so that you can start developing your component right away, without the app even running.)

## Committing

This repo uses [commitizen](https://commitizen.github.io), so instead of `git commit ...` use `yarn cm` or install commitizen globally and then use `git cz`.

Each commit triggers `yarn lint`.

## Changelog

To generate changelog, tag a new version, and push to code to remote, run `yarn release`.

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

**Put text/locale on pages like this**:

```jsx harmony
import { withNamespaces } from 'react-i18next'

@withNamespaces(['common', 'errors']) //namespaces = locale files, 1st one will be default
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

Locale strings are placed in `locale/filename_aka_namespace.yml`

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
