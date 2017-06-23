import {kdTree as kdTree} from './kdTree';
import euclideanDistance from 'ml-distance-euclidean';

export default class KNN {
    constructor(reload, model, distance) {
        if (reload) {
            this.kdTree = new kdTree(model.kdTree, distance || euclideanDistance);
            this.k = model.k;
            this.classes = model.classes;
        }
    }

    /**
     * Function that trains the KNN with the given trainingSet and trainingLabels.
     * The third argument is an object with the following options.
     *  * distance: that represent the distance function applied (default: euclidean)
     *  * k: the number of neighboors to take in count for classify (default: number of features + 1)
     *
     * @param trainingSet
     * @param trainingLabels
     * @param options
     */
    train(trainingSet, trainingLabels, options = {}) {
        const {
            distance = euclideanDistance,
            k = trainingSet[0].length + 1
        } = options;

        const classes = new Set(trainingLabels).size;

        var points = new Array(trainingSet.length);
        for (var i = 0; i < points.length; ++i) {
            points[i] = trainingSet[i].slice();
        }

        for (i = 0; i < trainingLabels.length; ++i) {
            points[i].push(trainingLabels[i]);
        }

        this.kdTree = new kdTree(points, distance);
        this.k = k;
        this.classes = classes;
    }

    /**
     * Function that returns the predictions given the dataset.
     *
     * @param dataset
     * @return {Array}
     */
    predict(dataset) {
        var predictions = new Array(dataset.length);
        for (var i = 0; i < dataset.length; ++i) {
            predictions[i] = this.getSinglePrediction(dataset[i]);
        }

        return predictions;
    }

    /**
     * function that returns a prediction for a single case.
     * @param currentCase
     * @return {number}
     */
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
            classes: this.classes
        };
    }

    static load(model, distance) {
        if (model.name !== 'KNN') {
            throw new RangeError('not a KNN model: ' + model.name);
        }
        return new KNN(true, model, distance);
    }
}
