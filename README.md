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

1. make sure you have [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed
1. `$ npm install`
1. (`$ npm run new` - optional, updates readme and stuff)
1. `$ npm run dev`
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
how | `$ npm start` and you're done | `$ npm run export` and then serve the contents of `out` directory
remarks | nope | you need to declare all exported pages in `exportPathMap` in `next.config.js` file

### deployment with gitlab

Handled by [pm2 deploy](http://pm2.keymetrics.io/docs/usage/deployment/), preconfigured via `gitlab-ci.yml` & `deploy.config.js`. To activate, change those files accordingly.

## Images

The `ImageTag` and `BackgroundImage` components expect that any raster image will have a corresponding `@2x`version, e.g. `image.png` & `image@2x.png`.

## Redux

Is pre-configured. If you'd rather not have it, revert commit 2aad8e304c2a97aba0ac47de224888bf4347f7cf or just remove `src/store`, and update `withLayout.js` and `package.json`

## Testing ([jest](https://facebook.github.io/jest/) & [enzyme](http://airbnb.io/enzyme/))

- `$ npm t` to run tests in watch mode.
- `$ npm run test-ci` for a single run with coverage reporting. Useful for CI.

## Linting ([eslint](https://eslint.org/) configured with [standard](https://standardjs.com/))

Run `$ npm run lint` for a linting report. Linter will also be run before pushing to remote.

## Static export

When exporting to static files (`$ npm run export`), all files in the `/static` directory will have an asset hash appended to filename. To require them properly, use `getStaticFilePath` function, as shown in `components/ImageTag`.

Unfortunately, there are two code smells necessary ([related issue](https://github.com/zeit/next.js/issues/2534)):
1. the build has to run twice - first time so the styles are extracted, to be available for `static-hash.js` script
2. see comment in `OnDonePlugin` function in `next.config.js`

## Fetching data

When server-rendering, the server can fetch data and send already pre-filled HTML to the client. For an example of how to do that, see `pages/about.js`. Of course you're still free to fetch on client side.

## Storybook

[Storybook](https://storybook.js.org/) is a UI development environment, which also can serve as styleguide.

Run `$ npm run storybook` to start the development mode - the Storybook will be available at [localhost:9001](http://localhost:9001/)

To build a static HTML version (to deploy as a styleguide perhaps), run `$ npm run storybook:build`. Note that [because reasons](https://github.com/zeit/next.js/issues/1788#issuecomment-322843264) the assets from the `static` directory will not be available in static HTML build.

## Commiting & changelog

This repo uses [commitizen](https://commitizen.github.io), so instead of `$ git commit ...` use `$ npm run cm` or install commitizen globally and then use `$ git cz`.

To generate changelog, tag a new version, and push to code to remote, run `$ npm run release`.

## Docker

To run the application in a docker container, first build the image with `$ docker build .`, then `$ docker run -P -d <image-id>` to expose all ports (`-P`) and run in detached mode (`-d`). Using [Kitematic](https://kitematic.com/) will make your life easier.

## Bundle analysis

Run `$ npm run analyze` to see what makes your bundles so fat.
