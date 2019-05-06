# spark ⚡

Boilerplate based on [next.js](https://github.com/zeit/next.js/) for web apps and static websites

## Features

- All stuff from [next.js](https://github.com/zeit/next.js/)
- Bundle Analyzer
- Service workers
- Files hashing
- Custom Node server
- [emotion](https://emotion.sh/docs/introduction) support with emotion-normalize and icofont-generator
- [Apollo GraphQL](https://www.apollographql.com/docs/react/)
- Plop code generators for:
  - components
  - sections (basically a component that has little logic and is just a page building block)
- Testing with [jest](https://facebook.github.io/jest/) & [enzyme](http://airbnb.io/enzyme/)
- [Eslint](https://eslint.org/)
- [Commitizen](https://commitizen.github.io)
- [Automatic changelog](https://github.com/leonardoanalista/corp-semantic-release)
- [Storybook](https://storybook.js.org/)
- [Sentry's Raven.js Library](https://www.npmjs.com/package/raven-js)

# Contents

- [Quick start](#quick-start)
- [Linking modules](#linking-modules)
- [App data handling and component layers](#app-data-handling-and-component-layers)
  * [Generating Components](#generating-components)
  * [Default components](#default-components)
    + [ImageTag](#imagetag)
    + [Link](#link)
- [Shards & styles](#shards---styles)
  * [Common & global styles](#common---global-styles)
- [Icons](#icons)
  * [Adding an icon](#adding-an-icon)
  * [Icon good practices](#icon-good-practices)
    + [Rules for the designer (make sure he or she realizes those):](#rules-for-the-designer--make-sure-he-or-she-realizes-those--)
    + [Rules for the developer:](#rules-for-the-developer-)
- [Inline SVG](#inline-svg)
- [Deployment](#deployment)
- [Testing](#testing)
- [Linting](#linting)
- [Storybook](#storybook)
- [Committing](#committing)
- [Changelog](#changelog)
- [Bundle analysis](#bundle-analysis)
- [Error tracking](#error-tracking)
- [Per environment config](#per-environment-config)
- [Static text content and internationalization (i18n)](#static-text-content-and-internationalization--i18n-)
  * [SSR](#ssr)
  * [More on i18next](#more-on-i18next)

# Quick start

1. make sure you have [nodejs](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/docs/install) installed
1. `yarn`
1. `yarn start`
1. `PORT=8888 yarn start` - if you want to start dev server on different port
1. Then visit [localhost:8000](http://localhost:8000/)

# Linking modules

This project is using `babel-plugin-root-import` to enable absolute linking for modules, using prefixes:

- `~` for `/components`
- `-` for `/static`
- `>` for `/` (project root)

```javascript
import MyComponent from '~/components/MyComponent/MyComponentContainer'
```

# App data handling and component layers

For separation of concern the components are split into layers that are kept in a component directory:

1. **shards file** - emotion StyledComponents - building blocks of any view, included in view component
1. **view component** - component, that deals strictly with the presentation
1. **container component** - business logic component; renders only a corresponding view component
1. **gql component** - apollo connection component; renders error/loading logic and container component

Example:
```bash
+ RestaurantsList  #component directory
|
|- RestaurantsListContainer.js # deals with business logic like filters etc
|- RestaurantsListGql.js # gql fetches and updates data
\- RestaurantsListView.js # displays list markup

```

Another type of components are sections. They are a page building blocks that involve a lot of displaying
and little logic. They can be connected to data using gql queries (directly). 

Besides those, there are a couple of other entities:
* **helpers** - general utilities
* **api** - remote communication that doesn't involve Apollo and GraphQL
* **higher order components (HOC)** - react component wrappers for DRYness

## Generating Components

You can generate components using:

```bash
yarn g:component
```

**It will create**:
* view component file
* shards file with emotion styled-component building blocks
* container component file (optional)
* view test file containing a snapshot test
* component test file containing no tests (optional, recommended if container component was created)
* gql component file (optional)
* storybook file (optional, recommended)

Afterwards the script will run all tests, and generate snapshot.

Again - Generator uses standard naming conventions that we've agreed upon (including BEM).
(If you mess with the conventions, be prepared to have your merge request rejected.)

## Default components

### ImageTag

Component create `img` tag with hashed image path and expect that any raster image will have a corresponding `@2x` version, e.g. `image.png` & `image@2x.png` (for  `*.svg` not needed).

### Link

Is's a standard NextLink but with tag `<a>` (better for SEO)


# Shards & styles

We use emotion. Preferably the StyledComponents syntax. 

Styled component building blocks are called _shards_.
They live in each component directory in a `ComponentName.shards.js` file.

## Common & global styles

Global and common styles dwell in `~/styles/` (common shards too). 

Global styles such as font-face and normalize are included in `_app.js`.

# Icons

Icons are shipped as webfonts generated from SVGs by the script:

```bash
yarn icofont
```

It takes all SVGs in the `/icons/` directory, builds webfont files, and puts them in the `/static/icons/` directory.
Finally, a "@font-face" file is generated into `~/styles/icofont.js` along with icon components. 
It includes all the icons found in `/icons/` dir. 
Once generated, each icon can be included in your components like so: 

```javascript
import { IcoCog } from '~/styles/icofont'
```

And used:

```javascript
const SomeComponent = () => <div> something, and an Icon: <IcoCog /></div>
```

## Adding an icon

1. Put the SVG in `/icons/` directory. Use _ProperCase_ to name files as they will be used as names of the components.
1. Run the script: `yarn icofont`
1. Celebrate 🍾

## Icon good practices

### Rules for the designer (make sure he or she realizes those):
* Icons should be made out of SVGs of uniform size (ie. height).
* The size of the SVGs should correspond to the grid size for the icon.
* Symbols in the SVG should conform to that grid and leave `2-3` grid units padding (depending on the shape).
* Symbols should be centered in the SVG but it's more important for them to conform to the grid.

(conform to the grid == lay exactly at the grid points, snap to grid at every possible point)

### Rules for the developer:
* For pixel-perfect icons use font size that is equal to `SVG grid height * n`.
* Remember: font-size corresponds to the SVG size (not the size of symbol within).
* Icons tend not to be horizontally pixel-perfect in 50% of cases (depending on browser);
  to mitigate this you can use `margin-left: .5px`, but remember to debug across all browsers.

# Inline SVG

How to use:

Add your `file.svg` to `src/svg` and then -

```javascript
  import SomeSVG from '~/svg/some.svg

  export default () =>
    <div className='my-component'>
      <SomeSVG />
    </div>
```

# Deployment

- `yarn start` - if you want to use node server
- `yarn export` - for static export (you need to declare all exported pages in `exports-map.js`)

# Testing

You can add your test in `__tests__` folder. Snapshots created automatically after run.

- `yarn t` to run tests in watch mode.
- `yarn test-ci` for a single run with coverage reporting. Useful for CI.

# Linting

Run `yarn lint` for a linting report. Linter will also be run before commit.

# Storybook

[Storybook](https://storybook.js.org/) is a UI development environment, which also can serve as styleguide.

Run `yarn storybook` to start the development mode - the Storybook will be available at [localhost:9001](http://localhost:6006/).

Generating components with the plop generator will add a Storybook page automatically for you
(so that you can start developing your component right away, without the app even running.)

# Committing

This repo uses [commitizen](https://commitizen.github.io), so instead of `git commit ...` use `yarn cm` or install commitizen globally and then use `git cz`.

Each commit triggers `yarn lint`.

# Changelog

To generate changelog, tag a new version, and push to code to remote, run `yarn release`.

# Bundle analysis

- `yarn analyze` - Build and analyze both server and browser
- `yarn analyze:server` - Build and analyze the back end server bundle
- `yarn analyze:browser` - Build and analyze the front end browser bundle

# Error tracking

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
import { withNamespaces } from '>/i18'

// If this component would be a page you need to specify a namespaces
// array in withLayout so next-i18next knows which namespaces to send server-side.
// This array should include all namespaces used on a page - also those of nested components.

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

Locale strings are placed in `static/locale/filename_aka_namespace.json`

## SSR

Each page component should declare prefetched namespaces like so:

```javascript
@withLayout({
  namespaces: ['landing']
})
```

This will ensure that SSR will generate documents with rendered locale and deliver translated HTML to client.
Otherwise user will experience flickering locale keys and web-crawlers might not see localized text at all. 

## More on i18next

Be aware that i18next is quite powerful. **Do not reinvent the wheel!** Use what i18next provides.
Ex. if you expect to support more than one language, do not simply concatenate strings with parameters,
as the resulting translation may have different word order in different languages. Instead use *interpolation* features
built into i18next instead (or the `Trans` component).

Besides *interpolation*, i18next does a great job with *pluralization* and other advanced locale stuff for you.

*Note on missing locales:* Do not copy English locale to other language packages. I18next will fall back English
in case of missing locale key for other language, and **will report it**. However, if you put an English "placeholder"
in a language locale file, the locale key will not be formally missing, and **will not be reported!**

Learn shit before you use it: [i18next for react](https://react.i18next.com/) &
[i18next for next](https://github.com/isaachinman/next-i18next) & [i18next](https://www.i18next.com/).
