'use strict';

module.exports = KNN;

var KDTree = require('./kdtree').kdTree;
var Distances = require('ml-distance');

function KNN(reload, model) {

}

KNN.prototype.train = function (trainingSet, trainingLabels, options) {
    if(options === undefined) options = {};
    if(options.distance === undefined) options.distance = Distances.euclidean;
    if(options.k === undefined) options.k = trainingSet[0].length + 1;

    // copy dataset
    var points = new Array(trainingSet.length);
    for(var i = 0; i < points.length; ++i) {
        points[i] = trainingSet[i].slice();
    }

    this.features = points[0].length;
    for(i = 0; i < trainingLabels.length; ++i) {
        points[i].push(trainingLabels[i]);
    }

    var dimensions = new Array(trainingSet[0].length);
    for(i = 0; i < dimensions.length; ++i) {
        dimensions[i] = i;
    }

    this.kdtree = new KDTree(points, options.distance, dimensions);
    this.k = options.k;
};

KNN.prototype.predict = function (dataset) {
    var predictions = new Array(dataset.length);
    for(var i = 0; i < dataset.length; ++i) {
        predictions[i] = this.getSinglePrediction(dataset[i]);
    }

    return predictions;
};

KNN.prototype.getSinglePrediction = function (currentCase) {
    var nearestPoints = this.kdtree.nearest(currentCase, this.k);
    var pointsPerClass = new Array(this.features);
    var predictedClass = -1;
    var maxPoints = -1;
    var lastElement = nearestPoints[0].length - 1;

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