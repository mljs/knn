'use strict';

var KNN = require('..');

describe('knn', function () {
    var cases = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
    var labels = [0, 0, 0, 1, 1, 1];

    var knn = new KNN();
    knn.train(cases, labels, {
        k: 3
    });

    it('Main test', function () {
        var result = knn.predict([[1.81, 1.81, 1.81], [0.5, 0.5, 0.5]]);

        result[0].should.be.equal(1);
        result[1].should.be.equal(0);
    });

    it('export and import options', function () {
        var model = knn.export();

        var newKNN = KNN.load(model);

        var result = knn.predict([[1.81, 1.81, 1.81], [0.5, 0.5, 0.5]]);

        result[0].should.be.equal(1);
        result[1].should.be.equal(0);
    });
});