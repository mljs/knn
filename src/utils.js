import { euclidean as euclideanDistance } from 'ml-distance-euclidean';

export function loadDistanceCheck(model, distance) {
  if (!model.isEuclidean && distance === euclideanDistance) {
    throw new Error(
      'a custom distance function was used to create the model. Please provide it again',
    );
  }
  if (model.isEuclidean && distance !== euclideanDistance) {
    throw new Error(
      'the model was created with the default distance function. Do not load it with another one',
    );
  }
}
