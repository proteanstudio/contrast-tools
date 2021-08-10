export default function debounce<T extends Parameters<any>>(
    fn: (...args: T) => void,
    threshold = 100
): (...args: T) => void {
    let timeout: NodeJS.Timeout;

    return function (...args: T): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), threshold);
    };
}
