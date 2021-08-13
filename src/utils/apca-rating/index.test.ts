import APCARating from '.';

describe('APCARating', () => {
    it('correctly calculates rating', () => {
        let rating = APCARating(110, 100);

        expect(rating).toEqual(4);

        rating = APCARating(100, 100);
        expect(rating).toEqual(4);

        rating = APCARating(99.999, 100);
        expect(rating).toEqual(3);

        rating = APCARating(95, 100);
        expect(rating).toEqual(3);

        rating = APCARating(94.999, 100);
        expect(rating).toEqual(2);

        rating = APCARating(90, 100);
        expect(rating).toEqual(2);

        rating = APCARating(89.999, 100);
        expect(rating).toEqual(1);

        rating = APCARating(85, 100);
        expect(rating).toEqual(1);

        rating = APCARating(84.999, 100);
        expect(rating).toEqual(0);
    });
});
