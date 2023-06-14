export interface ICleanColor {
    colorData: IColorData;
    isValid: boolean;
}

export type RGBArray = [number, number, number];

export const getRGBString = (rgb: RGBArray): string => {
    const [r, g, b] = rgb;
    return `rgb(${r}, ${g}, ${b})`;
};

export const cleanRGB = (activeColor: string): ICleanColor => {
    const regex = /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g;

    if (!regex.test(activeColor)) {
        return {
            colorData: {
                activeColor,
                hexString: '',
                rgbString: '',
                hexNumber: 0,
                rgb: [],
            },
            isValid: false,
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { workingColor, isValid, rgb } = activeColor
        .match(/\d{1,3}/g)!
        .reduce<{ workingColor: string; isValid: boolean; rgb: number[] }>(
            (acc, item) => {
                const num = Number(item);
                if (num > 255) {
                    acc.isValid = false;
                }

                acc.workingColor += num.toString(16).padStart(2, '0');
                acc.rgb.push(num);

                return acc;
            },
            { workingColor: '', isValid: true, rgb: [] }
        );

    return {
        colorData: {
            activeColor,
            hexString: `#${workingColor}`,
            rgbString: getRGBString(rgb as RGBArray),
            hexNumber: parseInt(workingColor, 16),
            rgb,
        },
        isValid,
    };
};

export const cleanHex = (activeColor: string): ICleanColor => {
    let workingColor = activeColor.replaceAll('#', '');
    let colorObj: {
        r: string;
        g: string;
        b: string;
        [key: string]: string;
    };

    switch (workingColor.length) {
        case 1:
            colorObj = {
                r: workingColor + workingColor,
                g: workingColor + workingColor,
                b: workingColor + workingColor,
            };
            break;
        case 2:
            colorObj = {
                r: workingColor,
                g: workingColor,
                b: workingColor,
            };
            break;
        case 3:
            colorObj = {
                r: workingColor.substring(0, 1) + workingColor.substring(0, 1),
                g: workingColor.substring(1, 2) + workingColor.substring(1, 2),
                b: workingColor.substring(2, 3) + workingColor.substring(2, 3),
            };
            break;
        case 6:
            colorObj = {
                r: workingColor.substring(0, 2),
                g: workingColor.substring(2, 4),
                b: workingColor.substring(4, 6),
            };
            break;
        default:
            return {
                colorData: {
                    activeColor,
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                },
                isValid: false,
            };
    }

    for (const colorVal in colorObj) {
        if (!/^[0-9A-F]{2}$/i.test(colorObj[colorVal])) {
            return {
                colorData: {
                    activeColor,
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                },
                isValid: false,
            };
        }
    }

    const { r, g, b }: IDict<number | string> = colorObj;
    activeColor = `#${workingColor}`;
    workingColor = r + g + b;

    const rgb = [r, g, b].map((num) => parseInt(num, 16)) as RGBArray;

    return {
        colorData: {
            activeColor,
            hexString: `#${workingColor}`,
            rgbString: getRGBString(rgb),
            hexNumber: parseInt(workingColor, 16),
            rgb: Object.values(colorObj).map((num) => parseInt(num, 16)),
        },
        isValid: true,
    };
};
