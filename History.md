# [3.0.0](https://github.com/mljs/knn/compare/v2.1.3...v3.0.0) (2019-06-29)


### chore

* update dependencies and remove support for Node.js 6 ([8727324](https://github.com/mljs/knn/commit/8727324))


### BREAKING CHANGES

* Node.js 6 is no longer supported.



<a name="2.1.3"></a>
## [2.1.3](https://github.com/mljs/knn/compare/v2.1.2...v2.1.3) (2017-10-26)


### Bug Fixes

* compute default k correctly ([c69b522](https://github.com/mljs/knn/commit/c69b522))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/mljs/knn/compare/v2.1.1...v2.1.2) (2017-10-09)


### Bug Fixes

* allow strings and non-consecutive numbers labels for classification ([574cac2](https://github.com/mljs/knn/commit/574cac2))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/mljs/knn/compare/v2.1.0...v2.1.1) (2017-08-21)


### Bug Fixes

* change default k to the number of classes + 1 ([d493043](https://github.com/mljs/knn/commit/d493043))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/mljs/knn/compare/v2.0.1...v2.1.0) (2017-07-11)


### Features

* add toJSON and load methods ([#7](https://github.com/mljs/knn/issues/7)) ([8d09afd](https://github.com/mljs/knn/commit/8d09afd))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/mljs/knn/compare/v2.0.0...v2.0.1) (2017-07-11)


### Bug Fixes

* options object is optional ([d735a00](https://github.com/mljs/knn/commit/d735a00)), closes [#4](https://github.com/mljs/knn/issues/4)



<a name="2.0.0"></a>
# 2.0.0 (2017-07-05)


### Code Refactoring

* remove train method ([#3](https://github.com/mljs/knn/issues/3)) ([2212170](https://github.com/mljs/knn/commit/2212170))
* use ES6 modules and change support to Node 8 and 6 ([#2](https://github.com/mljs/knn/issues/2)) ([4df79a8](https://github.com/mljs/knn/commit/4df79a8))

### Features

* allow to predict a single point ([f13c9f8](https://github.com/mljs/knn/commit/f13c9f8))

### BREAKING CHANGES

* The train method has been removed. Instead the arguments must be passed to the KNN constructor.
* This library now only supports Node.js 8 and 6.
