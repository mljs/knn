import iris from 'ml-dataset-iris';

import KNN from '..';

describe('knn', () => {
  const cases = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
    [2, 2, 2],
    [1, 2, 2],
    [2, 1, 2]
  ];
  const labels = [0, 0, 0, 1, 1, 1];

  const knn = new KNN(cases, labels, {
    k: 3
  });

  it('predictions', () => {
    const result = knn.predict([[1.81, 1.81, 1.81], [0.5, 0.5, 0.5]]);

    expect(result[0]).toBe(1);
    expect(result[1]).toBe(0);

    expect(knn.predict([1.81, 1.81, 1.81])).toBe(1);
  });

  it('type error', () => {
    const throwMessage = 'dataset to predict must be an array or a matrix';
    expect(() => knn.predict()).toThrow(throwMessage);
    expect(() => knn.predict([])).toThrow(throwMessage);
    expect(() => knn.predict(['a'])).toThrow(throwMessage);
    expect(() => knn.predict([[]])).toThrow(throwMessage);
    expect(() => knn.predict([['a']])).toThrow(throwMessage);
  });

  it('load', () => {
    const model = JSON.parse(JSON.stringify(knn));
    const newKnn = KNN.load(model);
    const result = newKnn.predict([[1.81, 1.81, 1.81], [0.5, 0.5, 0.5]]);

    expect(result[0]).toBe(1);
    expect(result[1]).toBe(0);

    expect(knn.predict([1.81, 1.81, 1.81])).toBe(1);
  });

  it('load errors', () => {
    expect(() => KNN.load({})).toThrow('invalid model: undefined');
    expect(() => KNN.load({ name: 'KNN', isEuclidean: true }, () => 1)).toThrow(
      'the model was created with the default distance function. Do not load it with another one'
    );
    expect(() => KNN.load({ name: 'KNN', isEuclidean: false })).toThrow(
      'a custom distance function was used to create the model. Please provide it again'
    );
  });

  it('Test with iris dataset', () => {
    var data = iris.getNumbers();
    var labels = iris.getClasses();

    var knn = new KNN(data, labels, { k: 5 });
    var test = [
      [5.1, 3.5, 1.4, 0.2],
      [4.9, 3.0, 1.4, 0.2],
      [4.7, 3.2, 1.3, 0.2],
      [4.6, 3.1, 1.5, 0.2],
      [5.0, 3.6, 1.4, 0.2],
      [6.1, 2.8, 4.7, 1.2],
      [6.4, 2.9, 4.3, 1.3],
      [6.6, 3.0, 4.4, 1.4],
      [6.8, 2.8, 4.8, 1.4],
      [6.7, 3.0, 5.0, 1.7],
      [6.8, 3.2, 5.9, 2.3],
      [6.7, 3.3, 5.7, 2.5],
      [6.7, 3.0, 5.2, 2.3],
      [6.3, 2.5, 5.0, 1.9],
      [6.5, 3.0, 5.2, 2.0]
    ];

    knn = KNN.load(JSON.parse(JSON.stringify(knn)));
    var expected = [
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica'
    ];

    expect(knn.predict(test)).toStrictEqual(expected);
  });

  it('default k', () => {
    const dataset = [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
      [2, 2, 2],
      [1, 2, 2],
      [2, 1, 2]
    ];
    const predictions = [0, 0, 0, 1, 1, 1];
    const knn = new KNN(dataset, predictions);

    expect(knn.k).toBe(3);

    var ans = knn.predict([[0, 0, 0]]);
    expect(ans).toStrictEqual([0]);
  });
});
