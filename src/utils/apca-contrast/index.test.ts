import APCAContrast from '.';

describe('APCAContrast', () => {
    it('correctly calculates contrast', () => {
        const foregroundColor = parseInt('1a1a1a', 16);
        const backgroundColor = parseInt('c7b5fb', 16);

        let contrastValue = APCAContrast(backgroundColor, foregroundColor);

        expect(contrastValue.toFixed(3)).toEqual('67.677');

        //different value when inverted
        contrastValue = APCAContrast(foregroundColor, backgroundColor);

        expect(contrastValue.toFixed(3)).toEqual('-66.807');
    });
});
