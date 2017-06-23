# knn

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

A General purpose k-nearest neighbor classifier algorithm based on the k-d tree Javascript library develop by Ubilabs:

* [k-d trees](https://github.com/ubilabs/kd-tree-javascript)

## Installation

`$ npm install --save ml-knn`

## API

### new KNN(dataset, predictions[, options])

Instantiates the KNN algorithm with the given dataset, predictions and options.

__Arguments__

* `dataset` - A matrix (2D array) of the dataset.
* `labels` - An array of labels (one for each sample in the dataset).
* `options` - Object with the options for the algorithm.

__Options__

* `k` - number of nearest neighbors (Default: number of labels + 1).
* `distance` - distance function for the algorithm (Default: euclidean distance).

__Example__

```js
var dataset = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
var predictions = [0, 0, 0, 1, 1, 1];
var knn = new KNN(dataset, predictions);
```

### predict(dataset)

Predict the values of the dataset.

__Arguments__

* `dataset` - A matrix that contains the dataset.

__Example__

```js
var dataset = [[0, 0, 0],
               [2, 2, 2]];

var ans = knn.predict(dataset);
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-knn.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-knn
[travis-image]: https://img.shields.io/travis/mljs/knn/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/knn
[download-image]: https://img.shields.io/npm/dm/ml-knn.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-knn
