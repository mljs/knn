import {kdTree as KDTree} from './kdtree';
import euclideanDistance from 'ml-distance-euclidean';

export default class KNN {
    constructor(reload, model) {
        if (reload) {
            this.kdtree = model.kdtree;
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

        var classes = 0;
        var exist = new Array(1000);
        var j = 0;
        for (var i = 0; i < trainingLabels.length; ++i) {
            if (exist.indexOf(trainingLabels[i]) === -1) {
                classes++;
                exist[j] = trainingLabels[i];
                j++;
            }
        }

        // copy dataset
        var points = new Array(trainingSet.length);
        for (i = 0; i < points.length; ++i) {
            points[i] = trainingSet[i].slice();
        }

        this.features = trainingSet[0].length;
        for (i = 0; i < trainingLabels.length; ++i) {
            points[i].push(trainingLabels[i]);
        }

        var dimensions = new Array(trainingSet[0].length);
        for (i = 0; i < dimensions.length; ++i) {
            dimensions[i] = i;
        }

        this.kdtree = new KDTree(points, distance, dimensions);
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
        var nearestPoints = this.kdtree.nearest(currentCase, this.k);
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
        throw new Error('toJSON is not implemented');
    }

    static load() {
        throw new Error('KNN.load is not implemented');
    }
}
