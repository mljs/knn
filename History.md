<a name="2.0.0"></a>
# 2.0.0 (2017-07-05)


### Code Refactoring

* remove train method ([#3](https://github.com/mljs/knn/issues/3)) ([2212170](https://github.com/mljs/knn/commit/2212170))
* use ES6 modules and change support to Node 8 and 6 ([#2](https://github.com/mljs/knn/issues/2)) ([4df79a8](https://github.com/mljs/knn/commit/4df79a8))


### Features

* allow to predict a single point ([f13c9f8](https://github.com/mljs/knn/commit/f13c9f8))


### BREAKING CHANGES

* The train method has been removed. Instead the arguments must be passed
to the KNN constructor.

* feat: throw if the custom distance function is not passed to load

* remove toJSON and load

They do not make sense. The internal data structure is much larger than the initial data

* eslint-fix

* rename variables

* remove unused variable
* This library now only supports Node.js 8 and 6.

* back to v1.0.0


