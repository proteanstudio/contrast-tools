export default function APCARating(comparisonValue: number, value: number): number {
    const percentageDiff = (Math.abs(comparisonValue) * 100) / value - 100;

    if (percentageDiff >= 0) return 4;

    const normalizedDiff = Math.floor(percentageDiff / 5) * 5;
    const rangeMap = new Map<number, number>([
        [0, 4],
        [-5, 3],
        [-10, 2],
        [-15, 1],
    ]);

    return rangeMap.get(normalizedDiff) ?? 0;
}
