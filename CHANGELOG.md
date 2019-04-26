<a name="1.2.0"></a>
# [1.2.0](https://gitlab.int.daftup.com/frontend/spark/compare/v1.1.0...v1.2.0) (2019-04-26)


### Bug Fixes

* added needed peer dependencies, npm -> yarn + yarn.lock ([2a3ff60](https://gitlab.int.daftup.com/frontend/spark/commit/2a3ff60))
* babelrc config ([c059683](https://gitlab.int.daftup.com/frontend/spark/commit/c059683))
* clean packages & project, added hash by file-loader & next-sass for style load ([2d40f89](https://gitlab.int.daftup.com/frontend/spark/commit/2d40f89))
* **CI:** Syntax error ([ca684b5](https://gitlab.int.daftup.com/frontend/spark/commit/ca684b5))
* make react-i18next not break ssr ([ceb7a43](https://gitlab.int.daftup.com/frontend/spark/commit/ceb7a43))
* raster image path ([2340c37](https://gitlab.int.daftup.com/frontend/spark/commit/2340c37))
* removed "isomorphic-unfetch", next.js has "unfetch" lib in dependencies ([be4593b](https://gitlab.int.daftup.com/frontend/spark/commit/be4593b))
* rename readme template ([57da76f](https://gitlab.int.daftup.com/frontend/spark/commit/57da76f))
* same babelrc for test & build ([b2c43f9](https://gitlab.int.daftup.com/frontend/spark/commit/b2c43f9))
* **build:** add service generator script ([f290deb](https://gitlab.int.daftup.com/frontend/spark/commit/f290deb))
* **build:** fix imports in reducer generator ([caebd4a](https://gitlab.int.daftup.com/frontend/spark/commit/caebd4a))
* **export:** stylesheet not found error ([65e4700](https://gitlab.int.daftup.com/frontend/spark/commit/65e4700))
* **icofont:** script, take only svg file ([aaf52f2](https://gitlab.int.daftup.com/frontend/spark/commit/aaf52f2))
* **ImageTag:** fix source path ([e3a1b30](https://gitlab.int.daftup.com/frontend/spark/commit/e3a1b30))
* **ImageTag:** path for [@2x](https://gitlab.int.daftup.com/2x) image version ([30dc80d](https://gitlab.int.daftup.com/frontend/spark/commit/30dc80d))
* **tests:** header test, added i18next & Date mocks ([9423e7b](https://gitlab.int.daftup.com/frontend/spark/commit/9423e7b))


### Features

* **assets:** set up asset hashing for static html export ([89f73f7](https://gitlab.int.daftup.com/frontend/spark/commit/89f73f7))
* sentry.io bugs tracker ([ff900ac](https://gitlab.int.daftup.com/frontend/spark/commit/ff900ac))
* **babel:** enable use of decorators ([58bc141](https://gitlab.int.daftup.com/frontend/spark/commit/58bc141))
* **componentGenerator:** add tests to component generator ([dc3134f](https://gitlab.int.daftup.com/frontend/spark/commit/dc3134f))
* **config:** add autoprefixer ([3f1b9fc](https://gitlab.int.daftup.com/frontend/spark/commit/3f1b9fc))
* **Config:** Introducing per env config ([72e3e6a](https://gitlab.int.daftup.com/frontend/spark/commit/72e3e6a))
* **EsLint:** Enabling linting before commit ([65c06a8](https://gitlab.int.daftup.com/frontend/spark/commit/65c06a8))
* RWD images handling; BackgroundImage component ([8855ae6](https://gitlab.int.daftup.com/frontend/spark/commit/8855ae6))
* **FileLoader:** added pdf & webm format to file-loader ([d859d13](https://gitlab.int.daftup.com/frontend/spark/commit/d859d13))
* **generator:** add component generator ([f34daf9](https://gitlab.int.daftup.com/frontend/spark/commit/f34daf9))
* **generators:** add redux generator for actions & reducers ([7d7b41d](https://gitlab.int.daftup.com/frontend/spark/commit/7d7b41d))
* **i18n:** add i18next ([41d0b0e](https://gitlab.int.daftup.com/frontend/spark/commit/41d0b0e))
* **icofont:** update icofont to generate each icon placeholder and font-base styles mixin ([ce7e931](https://gitlab.int.daftup.com/frontend/spark/commit/ce7e931))
* **iconFonts:** provide icon font generator & some minor fixes of other generators ([f533b9a](https://gitlab.int.daftup.com/frontend/spark/commit/f533b9a))
* **new-script:** ensure git is clean before running, commit & npm i after changes ([36f8b5a](https://gitlab.int.daftup.com/frontend/spark/commit/36f8b5a))
* **new-script:** remove about page when creating new project ([27b5860](https://gitlab.int.daftup.com/frontend/spark/commit/27b5860))
* **new-script:** replace title in withLayout ([666c6df](https://gitlab.int.daftup.com/frontend/spark/commit/666c6df))
* **NewProject:** Cleaning up new project builder ([77a9dce](https://gitlab.int.daftup.com/frontend/spark/commit/77a9dce))
* **PWA:** add manifest ([83c1ed2](https://gitlab.int.daftup.com/frontend/spark/commit/83c1ed2))
* **PWA:** configure service worker ([7e0e5ce](https://gitlab.int.daftup.com/frontend/spark/commit/7e0e5ce))
* **README:** add legend with links ([ad3117c](https://gitlab.int.daftup.com/frontend/spark/commit/ad3117c))
* **reducerGenerator:** generate reducer test and initialState stub ([94cd4eb](https://gitlab.int.daftup.com/frontend/spark/commit/94cd4eb))
* **serviceGenerator:** add service generator ([5252526](https://gitlab.int.daftup.com/frontend/spark/commit/5252526))
* add new project starting script ([4c51b23](https://gitlab.int.daftup.com/frontend/spark/commit/4c51b23))
* add redux ([2aad8e3](https://gitlab.int.daftup.com/frontend/spark/commit/2aad8e3))
* base styles ([afa67c3](https://gitlab.int.daftup.com/frontend/spark/commit/afa67c3))
* handling yamls & next@5 ([49b7912](https://gitlab.int.daftup.com/frontend/spark/commit/49b7912))
* new project structure with next.js 7 ([6b87dd3](https://gitlab.int.daftup.com/frontend/spark/commit/6b87dd3))
* **SSR:** Get initial props for page components ([65d6d34](https://gitlab.int.daftup.com/frontend/spark/commit/65d6d34))
* section generator ([bbe708b](https://gitlab.int.daftup.com/frontend/spark/commit/bbe708b))
* **store:** default store value in services for client ([f59b977](https://gitlab.int.daftup.com/frontend/spark/commit/f59b977))
* **storybook:** import global stylesheet in storybook ([93b26b3](https://gitlab.int.daftup.com/frontend/spark/commit/93b26b3))
* **Storybook:** decorators ([d5a78e6](https://gitlab.int.daftup.com/frontend/spark/commit/d5a78e6))
* **styles:** extract styles to .css file for production ([3275e83](https://gitlab.int.daftup.com/frontend/spark/commit/3275e83))
* Proper resolve yml and yaml extensions by webpack ([f9d002d](https://gitlab.int.daftup.com/frontend/spark/commit/f9d002d))
* remove `withLayout` in about page ([dbd784e](https://gitlab.int.daftup.com/frontend/spark/commit/dbd784e))
* remove withRouter in Header ([d73b605](https://gitlab.int.daftup.com/frontend/spark/commit/d73b605))
* SVG inlining ([2476b2f](https://gitlab.int.daftup.com/frontend/spark/commit/2476b2f))
* withLayout component HOC; demonstrate `withRouter` use in `Header` ([82a705d](https://gitlab.int.daftup.com/frontend/spark/commit/82a705d))



<a name="1.1.0"></a>
# [1.1.0](https://gitlab.int.daftup.com/daftup/frontend/spark/compare/v1.0.0...v1.1.0) (2018-01-23)


### Bug Fixes

* **babel:** change import prefix for styles to '+' ([06a6ce6](https://gitlab.int.daftup.com/daftup/frontend/spark/commit/06a6ce6))


### Features

* **docker:** configure and document Docker usage ([5523fe4](https://gitlab.int.daftup.com/daftup/frontend/spark/commit/5523fe4))
* **storybook:** configure storybook ([b408cbd](https://gitlab.int.daftup.com/daftup/frontend/spark/commit/b408cbd))



<a name="1.0.0"></a>
# 1.0.0 (2018-01-17)


### Features

* add data fetching as example d5c2636
* add home and about pages c6ed406
* better layout via _document 676b9e0
* **assets:** add ImageTag component and static assets 285c635
* **styles:** add styles handling - sass, autoprefixing, minification e96f465



