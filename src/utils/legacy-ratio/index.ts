function luminance(rgb: number[]) {
    const multipliers = [0.2126, 0.7152, 0.0722];
    return rgb.reduce((acc, item, index) => {
        let num = item / 255;
        num = num <= 0.03928 ? num / 12.92 : Math.pow((num + 0.055) / 1.055, 2.4);

        acc += num * multipliers[index];
        return acc;
    }, 0);
}

export default function legacyContrast(rgb1: number[], rgb2: number[]) {
    const lum1 = luminance(rgb1);
    const lum2 = luminance(rgb2);

    const darkest = Math.min(lum1, lum2);
    const brightest = Math.max(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
}
