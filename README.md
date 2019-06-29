# knn

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

A General purpose k-nearest neighbor classifier algorithm based on the k-d tree Javascript library develop by Ubilabs:

- [k-d trees](https://github.com/ubilabs/kd-tree-javascript)

## Installation

`$ npm i ml-knn`

## API

### new KNN(dataset, labels[, options])

Instantiates the KNN algorithm.

**Arguments**:

- `dataset` - A matrix (2D array) of the dataset.
- `labels` - An array of labels (one for each sample in the dataset).
- `options` - Object with the options for the algorithm.

**Options**:

- `k` - number of nearest neighbors (Default: number of labels + 1).
- `distance` - distance function for the algorithm (Default: euclidean distance).

**Example**:

```js
var dataset = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
  [2, 2, 2],
  [1, 2, 2],
  [2, 1, 2]
];
var predictions = [0, 0, 0, 1, 1, 1];
var knn = new KNN(dataset, predictions);
```

### predict(newDataset)

Predict the values of the dataset.

**Arguments**:

- `newDataset` - A matrix that contains the dataset.

**Example**:

```js
var dataset = [[0, 0, 0], [2, 2, 2]];

var ans = knn.predict(dataset);
```

### toJSON()

Returns an object representing the model. This function is automatically called if `JSON.stringify(knn)` is used.  
Be aware that the serialized model takes about 1.3 times the size of the input dataset (it actually is the dataset in a tree structure). Stringification can fail if the resulting string is too large.

### KNN.load(model[, distance])

Loads a model previously exported by `knn.toJSON()`. If a custom distance function was provided, it must be passed again.

## External links

Check this cool blog post for a detailed example:
https://hackernoon.com/machine-learning-with-javascript-part-2-da994c17d483

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-knn.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-knn
[travis-image]: https://img.shields.io/travis/mljs/knn/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/knn
[download-image]: https://img.shields.io/npm/dm/ml-knn.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-knn
