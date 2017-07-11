const v8 = require('v8');
const KNN = require('../');

const dataset = new Array(5e5);
const labels = new Array(5e5);
const possibleLabels = [0, 1, 2, 3, 4, 5];
for (var i = 0; i < dataset.length; i++) {
    var element = new Array(10);
    for (var j = 0; j < 10; j++) {
        element[j] = Math.random();
    }
    dataset[i] = element;
    labels[i] = possibleLabels[i % 6];
}

console.time('init');
var knn = new KNN(dataset, labels);
console.timeEnd('init');
debugger;
var inputJson = JSON.stringify({dataset, labels});
console.log(inputJson.length);
var modelJson = JSON.stringify(knn);
console.log(modelJson.length);
console.log(modelJson.length/inputJson.length);

console.log('serialize');
var inputSerialize = v8.serialize({dataset, labels});
console.log(inputSerialize.length);
var modelSerialize = v8.serialize(knn.toJSON());
console.log(modelSerialize.length);
console.log(modelSerialize.length / modelJson.length);

var model = JSON.parse(modelJson);

console.time('load');
var newKnn = KNN.load(model);
console.timeEnd('load');

var modelSer = v8.deserialize(modelSerialize);
console.time('loadSer');
var serKnn = KNN.load(modelSer);
console.timeEnd('loadSer');

var newData = new Array(10);
for (var j = 0; j < 10; j++) {
    newData[j] = Math.random();
}
console.time('predict1');
console.log(knn.predict(newData));
console.timeEnd('predict1');

console.time('predict2');
console.log(newKnn.predict(newData));
console.timeEnd('predict2');

console.time('predict3');
console.log(serKnn.predict(newData));
console.timeEnd('predict3');
