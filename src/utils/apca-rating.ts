export default function APCARating(comparisonValue: number, value: number): number {
    const percentageDiff = (Math.abs(comparisonValue) / value - 1) * 100;

    switch (true) {
        case percentageDiff >= 0:
            return 4;
        case percentageDiff >= -5:
            return 3;
        case percentageDiff >= -10:
            return 2;
        case percentageDiff >= -15:
            return 1;
        default:
            return 0;
    }
}
