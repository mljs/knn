import { euclidean as euclideanDistance } from 'ml-distance-euclidean';

import { KNN } from './base';
import { loadDistanceCheck } from './utils';

export class KNNClassifier extends KNN {
  /**
   * Predicts the output given the matrix to predict.
   * @param {Array} dataset
   * @return {Array} predictions
   */

  /**
   * Return a JSON containing the kd-tree model.
   * @return {object} JSON KNN model.
   */
  toJSON() {
    return {
      name: 'KNNClassifier',
      kdTree: this.kdTree,
      k: this.k,
      classes: Array.from(this.classes),
      isEuclidean: this.isEuclidean,
    };
  }

  /**
   * Create a new KNNClassifier instance with the given model.
   * @param {object} model
   * @param {function} distance=euclideanDistance - distance function must be provided if the model wasn't trained with euclidean distance.
   * @return {KNNClassifier}
   */
  static load(model, distance = euclideanDistance) {
    if (model.name === undefined || model.name !== 'KNNClassifier') {
      throw new TypeError(`invalid model: ${model.name}`);
    }
    loadDistanceCheck(model, distance);
    return new KNNClassifier(true, model, distance);
  }

  predict(dataset) {
    if (Array.isArray(dataset)) {
      if (typeof dataset[0] === 'number') {
        return getSinglePrediction(this, dataset);
      } else if (
        Array.isArray(dataset[0]) &&
        typeof dataset[0][0] === 'number'
      ) {
        const predictions = new Array(dataset.length);
        for (let i = 0; i < dataset.length; i++) {
          predictions[i] = getSinglePrediction(this, dataset[i]);
        }
        return predictions;
      }
    }
    throw new TypeError('dataset to predict must be an array or a matrix');
  }
}

function getSinglePrediction(knn, currentCase) {
  let nearestPoints = knn.kdTree.nearest(currentCase, knn.k);
  let pointsPerClass = {};
  let predictedClass = -1;
  let maxPoints = -1;
  let lastElement = nearestPoints[0][0].length - 1;

  for (let element of knn.classes) {
    pointsPerClass[element] = 0;
  }

  for (let i = 0; i < nearestPoints.length; ++i) {
    let currentClass = nearestPoints[i][0][lastElement];
    let currentPoints = ++pointsPerClass[currentClass];
    if (currentPoints > maxPoints) {
      predictedClass = currentClass;
      maxPoints = currentPoints;
    }
  }

  return predictedClass;
}
