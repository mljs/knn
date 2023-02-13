import { euclidean as euclideanDistance } from 'ml-distance-euclidean';

import KDTree from './KDTree';
import { loadDistanceCheck } from './utils';

export class KNN {
  /**
   * @param {Array} dataset
   * @param {Array} labels
   * @param {object} options
   * @param {number} [options.k=numberOfClasses + 1] - Number of neighbors to classify.
   * @param {function} [options.distance=euclideanDistance] - Distance function that takes two parameters.
   */
  constructor(dataset, labels, options = {}) {
    if (dataset === true) {
      const model = labels;
      this.kdTree = new KDTree(model.kdTree, options);
      this.k = model.k;
      this.classes = new Set(model.classes);
      this.isEuclidean = model.isEuclidean;
      return;
    }

    const classes = new Set(labels);

    const { distance = euclideanDistance, k = classes.size + 1 } = options;

    const points = new Array(dataset.length);
    for (let i = 0; i < points.length; ++i) {
      points[i] = dataset[i].slice();
    }

    for (let i = 0; i < labels.length; ++i) {
      points[i].push(labels[i]);
    }

    this.kdTree = new KDTree(points, distance);
    this.k = k;
    this.classes = classes;
    this.isEuclidean = distance === euclideanDistance;
  }

  /**
   * Create a new KNN instance with the given model.
   * @param {object} model
   * @param {function} distance=euclideanDistance - distance function must be provided if the model wasn't trained with euclidean distance.
   * @return {KNN}
   */
  static load(model, distance = euclideanDistance) {
    if (model.name !== 'KNN') {
      throw new TypeError(`invalid model: ${model.name}`);
    }
    loadDistanceCheck(model, distance);
    return new KNN(true, model, distance);
  }

  /**
   * Return a JSON containing the kd-tree model.
   * @return {object} JSON KNN model.
   */
  toJSON() {
    return {
      name: 'KNN',
      kdTree: this.kdTree,
      k: this.k,
      classes: Array.from(this.classes),
      isEuclidean: this.isEuclidean,
    };
  }

  predict(dataset) {
    throw new Error('predict method must be implemented');
  }
}
