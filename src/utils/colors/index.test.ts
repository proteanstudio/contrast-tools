import { getRGBString, cleanHex, cleanRGB } from '.';

describe('color utilities', () => {
    describe('getRGBString', () => {
        it('gets an rgb string', () => {
            expect(getRGBString([12, 34, 56])).toEqual('rgb(12, 34, 56)');
        });
    });

    describe('cleanRGB', () => {
        it('returns default color data for hex codes', () => {
            expect(cleanRGB('#123456')).toEqual({
                colorData: {
                    activeColor: '#123456',
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                },
                isValid: false,
            });
        });

        it('returns default color data for malformed rgb codes', () => {
            expect(cleanRGB('rgb(123, 9999, 244)')).toEqual({
                colorData: {
                    activeColor: 'rgb(123, 9999, 244)',
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                },
                isValid: false,
            });
        });

        it('parses rgb color codes', () => {
            expect(cleanRGB('rgb(0, 123, 255)')).toEqual({
                colorData: {
                    activeColor: 'rgb(0, 123, 255)',
                    hexString: '#007bff',
                    rgbString: 'rgb(0, 123, 255)',
                    hexNumber: 31743,
                    rgb: [0, 123, 255],
                },
                isValid: true,
            });
        });

        it('marks invalid color codes', () => {
            expect(cleanRGB('rgb(0, 123, 256)')).toEqual({
                colorData: {
                    activeColor: 'rgb(0, 123, 256)',
                    hexString: '#007b100',
                    rgbString: 'rgb(0, 123, 256)',
                    hexNumber: 504064,
                    rgb: [0, 123, 256],
                },
                isValid: false,
            });
        });
    });

    describe('cleanHex', () => {
        it('handles single character codes', () => {
            expect(cleanHex('#1')).toEqual({
                colorData: {
                    activeColor: '#1',
                    hexString: '#111111',
                    rgbString: 'rgb(17, 17, 17)',
                    hexNumber: 1118481,
                    rgb: [17, 17, 17],
                },
                isValid: true,
            });
        });

        it('handles 2 character codes', () => {
            expect(cleanHex('#21')).toEqual({
                colorData: {
                    activeColor: '#21',
                    hexString: '#212121',
                    rgbString: 'rgb(33, 33, 33)',
                    hexNumber: 2171169,
                    rgb: [33, 33, 33],
                },
                isValid: true,
            });
        });

        it('handles 3 character codes', () => {
            expect(cleanHex('#210')).toEqual({
                colorData: {
                    activeColor: '#210',
                    hexString: '#221100',
                    rgbString: 'rgb(34, 17, 0)',
                    hexNumber: 2232576,
                    rgb: [34, 17, 0],
                },
                isValid: true,
            });
        });

        it('returns default color data for 4 character codes', () => {
            expect(cleanHex('#210f')).toEqual({
                colorData: {
                    activeColor: '#210f',
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                },
                isValid: false,
            });
        });

        it('handles full hex code', () => {
            expect(cleanHex('#212121')).toEqual({
                colorData: {
                    activeColor: '#212121',
                    hexString: '#212121',
                    rgbString: 'rgb(33, 33, 33)',
                    hexNumber: 2171169,
                    rgb: [33, 33, 33],
                },
                isValid: true,
            });
        });

        it('handles slightly malformed hex code', () => {
            expect(cleanHex('##212121')).toEqual({
                colorData: {
                    activeColor: '#212121',
                    hexString: '#212121',
                    rgbString: 'rgb(33, 33, 33)',
                    hexNumber: 2171169,
                    rgb: [33, 33, 33],
                },
                isValid: true,
            });
        });
    });
});
