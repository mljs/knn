'use strict';

module.exports = KNN;

var KDTree = require('./kdtree').kdTree;
var Distances = require('ml-distance');

/**
 * K-Nearest neighboor constructor.
 *
 * @param reload - loading purposes.
 * @param model - loading purposes
 * @constructor
 */
function KNN(reload, model) {
    if(reload) {
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
KNN.prototype.train = function (trainingSet, trainingLabels, options) {
    if(options === undefined) options = {};
    if(options.distance === undefined) options.distance = Distances.distance.euclidean;
    if(options.k === undefined) options.k = trainingSet[0].length + 1;

    var classes = 0;
    var exist = new Array(1000);
    var j = 0;
    for(var i = 0; i < trainingLabels.length; ++i) {
        if(exist.indexOf(trainingLabels[i]) === -1) {
            classes++;
            exist[j] = trainingLabels[i];
            j++;
        }
    }

    // copy dataset
    var points = new Array(trainingSet.length);
    for(i = 0; i < points.length; ++i) {
        points[i] = trainingSet[i].slice();
    }

    this.features = trainingSet[0].length;
    for(i = 0; i < trainingLabels.length; ++i) {
        points[i].push(trainingLabels[i]);
    }

    var dimensions = new Array(trainingSet[0].length);
    for(i = 0; i < dimensions.length; ++i) {
        dimensions[i] = i;
    }

    this.kdtree = new KDTree(points, options.distance, dimensions);
    this.k = options.k;
    this.classes = classes;
};

/**
 * Function that returns the predictions given the dataset.
 * 
 * @param dataset
 * @returns {Array}
 */
KNN.prototype.predict = function (dataset) {
    var predictions = new Array(dataset.length);
    for(var i = 0; i < dataset.length; ++i) {
        predictions[i] = this.getSinglePrediction(dataset[i]);
    }

    return predictions;
};

/**
 * function that returns a prediction for a single case.
 * @param currentCase
 * @returns {number}
 */
KNN.prototype.getSinglePrediction = function (currentCase) {
    var nearestPoints = this.kdtree.nearest(currentCase, this.k);
    var pointsPerClass = new Array(this.classes);
    var predictedClass = -1;
    var maxPoints = -1;
    var lastElement = nearestPoints[0][0].length - 1;

    for(var i = 0; i < pointsPerClass.length; ++i) {
        pointsPerClass[i] = 0;
    }

    for(i = 0; i < nearestPoints.length; ++i) {
        var currentClass = nearestPoints[i][0][lastElement];
        var currentPoints = ++pointsPerClass[currentClass];
        if(currentPoints > maxPoints) {
            predictedClass = currentClass;
            maxPoints = currentPoints;
        }
    }

    return predictedClass;
};

/**
 * function that returns a KNN classifier with the given model.
 *
 * @param model
 */
KNN.load = function (model) {
    if(model.modelName !== "KNN")
        throw new RangeError("The given model is invalid!");

    return new KNN(true, model);
};

/**
 * function that exports the current KNN classifier.
 */
KNN.prototype.export = function () {
    return {
        modelName: "KNN",
        kdtree: this.kdtree,
        k: this.k,
        classes: this.classes
    };
};