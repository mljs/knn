import {kdTree as KDTree} from './kdTree';
import euclideanDistance from 'ml-distance-euclidean';

export default class KNN {
    constructor(dataset, labels, options = {}) {
        if (dataset === true) {
            const model = labels;
            this.kdTree = new KDTree(model.kdTree, options);
            this.k = model.k;
            this.classes = model.classes;
            this.isEuclidean = model.isEuclidean;
            return;
        }
        const {
            distance = euclideanDistance,
            k = dataset[0].length + 1
        } = options;

        const classes = new Set(labels).size;

        const points = new Array(dataset.length);
        for (var i = 0; i < points.length; ++i) {
            points[i] = dataset[i].slice();
        }

        for (i = 0; i < labels.length; ++i) {
            points[i].push(labels[i]);
        }

        this.kdTree = new KDTree(points, distance);
        this.k = k;
        this.classes = classes;
        this.isEuclidean = distance === euclideanDistance;
    }

    static load(model, distance = euclideanDistance) {
        if (model.name !== 'KNN') {
            throw new Error('invalid model: ' + model.name);
        }
        if (!model.isEuclidean && distance === euclideanDistance) {
            throw new Error('a custom distance function was used to create the model. Please provide it again');
        }
        if (model.isEuclidean && distance !== euclideanDistance) {
            throw new Error('the model was created with the default distance function. Do not load it with another one');
        }
        return new KNN(true, model, distance);
    }

    toJSON() {
        return {
            name: 'KNN',
            kdTree: this.kdTree.toJSON(),
            k: this.k,
            classes: this.classes,
            isEuclidean: this.isEuclidean
        };
    }

    predict(dataset) {
        if (Array.isArray(dataset)) {
            if (typeof dataset[0] === 'number') {
                return getSinglePrediction(this, dataset);
            } else if (Array.isArray(dataset[0]) && typeof dataset[0][0] === 'number') {
                const predictions = new Array(dataset.length);
                for (var i = 0; i < dataset.length; i++) {
                    predictions[i] = getSinglePrediction(this, dataset[i]);
                }
                return predictions;
            }
        }
        throw new TypeError('dataset to predict must be an array or a matrix');
    }
}

function getSinglePrediction(knn, currentCase) {
    var nearestPoints = knn.kdTree.nearest(currentCase, knn.k);
    var pointsPerClass = new Array(knn.classes);
    var predictedClass = -1;
    var maxPoints = -1;
    var lastElement = nearestPoints[0][0].length - 1;

    for (var i = 0; i < pointsPerClass.length; ++i) {
        pointsPerClass[i] = 0;
    }

    for (i = 0; i < nearestPoints.length; ++i) {
        var currentClass = nearestPoints[i][0][lastElement];
        var currentPoints = ++pointsPerClass[currentClass];
        if (currentPoints > maxPoints) {
            predictedClass = currentClass;
            maxPoints = currentPoints;
        }
    }

    return predictedClass;
}
