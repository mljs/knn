import KNN from '..';

describe('knn', () => {
    const cases = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
    const labels = [0, 0, 0, 1, 1, 1];

    const knn = new KNN(cases, labels, {
        k: 3
    });

    it('Main test', () => {
        const result = knn.predict([[1.81, 1.81, 1.81], [0.5, 0.5, 0.5]]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(0);
    });

    it('export and import options', () => {
        const model = JSON.parse(JSON.stringify(knn));

        const newKNN = KNN.load(model);
        const result = newKNN.predict([[1.81, 1.81, 1.81], [0.5, 0.5, 0.5]]);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(0);
    });
});
