import {kdTree as KDTree} from './kdTree';
import euclideanDistance from 'ml-distance-euclidean';

export default class KNN {
    constructor(dataset, labels, options) {
        if (dataset === true) {
            const model = labels;
            const distance = options;
            this.kdTree = new KDTree(model.kdTree, distance);
            this.k = model.k;
            this.classes = model.classes;
            this.distance = distance;
        } else {
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
            this.distance = distance;
        }
    }

    predict(dataset) {
        var predictions = new Array(dataset.length);
        for (var i = 0; i < dataset.length; ++i) {
            predictions[i] = this.getSinglePrediction(dataset[i]);
        }

        return predictions;
    }

    getSinglePrediction(currentCase) {
        var nearestPoints = this.kdTree.nearest(currentCase, this.k);
        var pointsPerClass = new Array(this.classes);
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

    toJSON() {
        return {
            name: 'KNN',
            kdTree: this.kdTree.toJSON(),
            k: this.k,
            classes: this.classes,
            distance: this.distance === euclideanDistance ? 'euclidean' : 'other'
        };
    }

    static load(model, distance) {
        if (model.name !== 'KNN') {
            throw new RangeError('not a KNN dataset: ' + model.name);
        }
        if (model.distance === 'euclidean') {
            distance = euclideanDistance;
        } else if (!distance) {
            throw new TypeError('missing custom distance function');
        }
        return new KNN(true, model, distance);
    }
}
