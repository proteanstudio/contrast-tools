import legacyContrast, { luminance } from '.';

describe('APCARating', () => {
    it('correctly calculates ratio', () => {
        let foregroundColor = [26, 26, 26];
        let backgroundColor = [199, 181, 251];

        let ratio = legacyContrast(foregroundColor, backgroundColor);

        expect(ratio.toFixed(3)).toEqual('9.474');

        ratio = legacyContrast(backgroundColor, foregroundColor);
        expect(ratio.toFixed(3)).toEqual('9.474');

        foregroundColor = [255, 255, 255];
        backgroundColor = [114, 9, 183];

        ratio = legacyContrast(foregroundColor, backgroundColor);

        expect(ratio.toFixed(3)).toEqual('8.612');
    });

    it('correctly calculates luminance', () => {
        let color = [199, 181, 251];

        let lum = luminance(color);
        expect(lum.toFixed(3)).toEqual('0.522');

        color = [26, 26, 26];
        lum = luminance(color);

        expect(lum.toFixed(3)).toEqual('0.010');

        //testing 0.03928 threshold
        color = [4, 8, 1];
        lum = luminance(color);

        expect(lum.toFixed(3)).toEqual('0.002');
    });
});
