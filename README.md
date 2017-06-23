# knn

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

A General purpose k-nearest neighbor classifier algorithm based on the k-d tree Javascript library develop by Ubilabs:

* [k-d trees](https://github.com/ubilabs/kd-tree-javascript)

## Installation

`$ npm install --save ml-knn`

## API

### new KNN()

Constructor that takes no arguments.

__Example__

```js
var knn = new KNN();
```

### train(trainingSet, predictions)

Train the KNN model with the given training set, predictions, and some options.

__Arguments__

* `trainingSet` - A matrix of the training set.
* `trainingLabels` - An array of value for each case in the training set.
* `options` - Object with the options for the training.

__Options__

* `k` - number of nearest neighbor (Default, number of label + 1).
* `distance` - distance function for the algorithm, the argument is a function, not an String
                (by default is euclidean, you can use the functions of this repository [distance](https://github.com/mljs/distance)).

__Example__

```js
var trainingSet = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
var predictions = [0, 0, 0, 1, 1, 1];

knn.train(trainingSet, predictions);
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
