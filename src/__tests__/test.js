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
        expect(() => KNN.load({name: 'KNN', isEuclidean: true}, () => 1)).toThrow('the model was created with the default distance function. Do not load it with another one');
        expect(() => KNN.load({name: 'KNN', isEuclidean: false})).toThrow('a custom distance function was used to create the model. Please provide it again');
    });
});
