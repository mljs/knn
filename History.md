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
