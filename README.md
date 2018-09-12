# spark ⚡️

a template for web apps and static websites

[![build status](https://gitlab.int.daftup.com/daftup/frontend/spark/badges/master/build.svg)](https://gitlab.int.daftup.com/daftup/frontend/spark/commits/master)
[![coverage report](https://gitlab.int.daftup.com/daftup/frontend/spark/badges/master/coverage.svg)](https://gitlab.int.daftup.com/daftup/frontend/spark/commits/master)

## Key features

It's built on top of [next.js](https://github.com/zeit/next.js/), so:

- React
- client side routing with prefetching
- automatic code splitting
- hot module reloading during development
- server rendering
- static HTML export
- modern JS: use `() => {}`, `async/await`, generators and all that jazz.

And then it adds:

- styling: sass support & [normalize.css](https://necolas.github.io/normalize.css/) & [autoprefixing](http://cssnext.io/) & [minification](http://cssnano.co/) all via [PostCSS](http://postcss.org/)
- [redux](https://redux.js.org/)
- testing with [jest](https://facebook.github.io/jest/) & [enzyme](http://airbnb.io/enzyme/)
- [eslint](https://eslint.org/) configured with [standard](https://standardjs.com/)
- [commitizen](https://commitizen.github.io) & [automatic changelog](https://github.com/leonardoanalista/corp-semantic-release)
- [storybook](https://storybook.js.org/)
- [docker](https://www.docker.com/)

## What is next.js

> Next.js is a small framework for server-rendered universal JavaScript webapps, built on top of React, Webpack and Babel

Get acquianted with next.js by doing [this lovely tutorial](learnnextjs.com), reading the [introductory blog post](https://zeit.co/blog/next) and [the docs](https://github.com/zeit/next.js). The most important is that files in `pages` folder map to routes in the application. If you wanna know more about the whys of next.js, [read this](https://rauchg.com/2014/7-principles-of-rich-web-applications).

## Quick start

1. make sure you have [nodejs](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/docs/install#mac-stable) installed
1. `$ yarn`
1. (`$ yarn new` - optional, updates readme and stuff)
1. `$ yarn start`
1. `$ PORT=8000 yarn start` - if you want to start dev server on different port
1. bang! visit [localhost:3000](http://localhost:3000/) there it is

## Linking modules

This project is using `babel-plugin-root-import` to enable absolute linking for modules, using prefixes - `~` for `/components` and `+` for `/styles`:

```javascript
import MyComponent from '~/components/MyComponent'
import styles from '+/style.sass'
```

## Deployment

what | node app | static assets
--- | --- | ---
why | server-side rendering, prefetching, etc. | use cheap hosting such as AWS S3
how | `$ yarn start` and you're done | `$ yarn export` and then serve the contents of `out` directory
remarks | nope | you need to declare all exported pages in `exportPathMap` in `next.config.js` file

### deployment with gitlab

Handled by [pm2 deploy](http://pm2.keymetrics.io/docs/usage/deployment/), preconfigured via `gitlab-ci.yml` & `deploy.config.js`. To activate, change those files accordingly.

## Images

The `ImageTag` component expect that any raster image will have a corresponding `@2x`version, e.g. `image.png` & `image@2x.png`.

In styles for background image you can use `get-asset-url` or for custom path from static folder `get-static-file-path`
- `get-asset-url` takes images from asset folder - `background-image: get-asset-url('image.png')`
- `src: url(get-static-file-path('fonts/font.woff'))`

## Styles & structure

We recommend you to create your app using BEM structure.
- (What is BEM?)[http://getbem.com/introduction/]
- [bemCx](https://www.npmjs.com/package/bem-modifiers) - Simple utility inspired by classnames that glues class with --modifiers.

Project has included [bootstrap-grid](https://getbootstrap.com/docs/4.0/layout/grid/)
You can customize grid options in `styles/grid.scss`
Don't forget, bootstrap-grid has included some [utilities](https://getbootstrap.com/docs/4.0/layout/utilities-for-layout/):
- Changing display
- Flexbox options
- Margin and padding
- Toggle visibility

Since [bootstrap-grid](https://getbootstrap.com/docs/4.0/layout/grid/) is Sass lib, all media queries are available via mixins ([read more](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)).
- `@include media-breakpoint-up(xs) { ... }`
- `@include media-breakpoint-down(xs) { ... }`
- `@include media-breakpoint-between(md, xl) { ... }`
- `@media (max-width: $size-const) { ... }`
- `@include media-breakpoint-only(xs) { ... }`

Don't forget to remove `styles/grid.scss` & `yarn remove bootstrap-4-grid` if no necessary to use it!

## Redux

Is pre-configured. If you'd rather not have it - just remove `src/store`, update `withLayout.js` and `package.json`

## Testing ([jest](https://facebook.github.io/jest/) & [enzyme](http://airbnb.io/enzyme/))

- `$ yarn t` to run tests in watch mode.
- `$ yarn test-ci` for a single run with coverage reporting. Useful for CI.

## Linting ([eslint](https://eslint.org/) configured with [standard](https://standardjs.com/))

Run `$ yarn lint` for a linting report. Linter will also be run before pushing to remote.

## Static export

When exporting to static files (`$ yarn export`), all imports from the `/static` directory will have an asset hash appended to filename. To require them properly, use `getStaticFilePath` function, as shown in `components/ImageTag`.

## Fetching data

When server-rendering, the server can fetch data and send already pre-filled HTML to the client. For an example of how to do that, see `pages/about.js`. Of course you're still free to fetch on client side.

## Storybook

[Storybook](https://storybook.js.org/) is a UI development environment, which also can serve as styleguide.

Run `$ yarn storybook` to start the development mode - the Storybook will be available at [localhost:9001](http://localhost:9001/)

To build a static HTML version (to deploy as a styleguide perhaps), run `$ yarn storybook:build`. Note that [because reasons](https://github.com/zeit/next.js/issues/1788#issuecomment-322843264) the assets from the `static` directory will not be available in static HTML build.

## Commiting & changelog

This repo uses [commitizen](https://commitizen.github.io), so instead of `$ git commit ...` use `$ yarn cm` or install commitizen globally and then use `$ git cz`.

To generate changelog, tag a new version, and push to code to remote, run `$ yarn release`.

## Docker

To run the application in a docker container, first build the image with `$ docker build .`, then `$ docker run -P -d <image-id>` to expose all ports (`-P`) and run in detached mode (`-d`). Using [Kitematic](https://kitematic.com/) will make your life easier.

## Bundle analysis

Run `$ yarn analyze` to see what makes your bundles so fat.

## Error tracking

Raven.js is the official browser JavaScript client for [Sentry](https://sentry.io). It automatically reports uncaught JavaScript exceptions triggered from a browser environment, and provides a rich API for reporting your own errors.

Add your config like - `https://<key>@sentry.io/<project>` to `ravenUrl` in `~/utils/settings`

# Per environment config

Based on dotenv package.

Any secret config like password, api keys should be placed in .env file in projects root directory.
Any public config like external api url, server config should be placed in /config/{environment}.

Specified variables can be accessed like ... `process.env.SOME_VARIABLE`
