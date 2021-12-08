import { APCAcontrast, sRGBtoY } from '.';

describe('APCAContrast', () => {
    it('correctly calculates contrast', () => {
        const foregroundColor = sRGBtoY(parseInt('1a1a1a', 16));
        const backgroundColor = sRGBtoY(parseInt('c7b5fb', 16));

        let contrastValue = APCAcontrast(foregroundColor, backgroundColor);

        expect(contrastValue).toEqual(68);

        //different value when inverted
        contrastValue = APCAcontrast(backgroundColor, foregroundColor);

        expect(contrastValue).toEqual(-67);
    });
});
