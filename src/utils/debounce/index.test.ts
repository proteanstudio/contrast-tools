import wait from '../test-helpers/wait';
import debounce from './';
import { jest } from '@jest/globals';

describe('debounce', () => {
    it('debounces at default 100ms', async () => {
        const setTimeoutSpy = jest.spyOn(window, 'setTimeout');
        const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

        const fn = jest.fn();
        const debouncedFn = debounce(fn);

        expect(typeof debouncedFn).toBe('function');

        debouncedFn();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(clearTimeoutSpy).toHaveBeenCalledWith(undefined);
        expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(typeof setTimeoutSpy.mock.calls[0][0]).toEqual('function');
        expect(setTimeoutSpy.mock.calls[0][1]).toEqual(100);
        expect(fn).toHaveBeenCalledTimes(0);

        debouncedFn();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
        expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenCalledTimes(0);

        await wait(100);
        expect(fn).toHaveBeenCalledTimes(1);

        debouncedFn();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);
        expect(fn).toHaveBeenCalledTimes(1);

        await wait(100);
        expect(fn).toHaveBeenCalledTimes(2);

        setTimeoutSpy.mockRestore();
        clearTimeoutSpy.mockRestore();
    });

    it('debounces at with custom time', async () => {
        const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

        const fn = jest.fn();
        const debouncedFn = debounce(fn, 2);

        debouncedFn();

        expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(setTimeoutSpy.mock.calls[0][1]).toEqual(2);
        expect(fn).toHaveBeenCalledTimes(0);

        debouncedFn();

        await wait(2);
        expect(fn).toHaveBeenCalledTimes(1);

        debouncedFn();

        setTimeoutSpy.mockRestore();
    });

    it('accepts arguments', async () => {
        const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

        const fn = jest.fn();
        const debouncedFn = debounce(fn, 2);

        debouncedFn(0, 'not this time');

        expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(setTimeoutSpy.mock.calls[0][1]).toEqual(2);
        expect(fn).toHaveBeenCalledTimes(0);

        debouncedFn(1, 'test');

        await wait(2);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(1, 'test');

        setTimeoutSpy.mockRestore();
    });
});
