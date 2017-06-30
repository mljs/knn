import KNN from '..';

describe('knn', () => {
    const cases = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
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
});
