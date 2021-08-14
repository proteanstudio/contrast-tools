import { render, fireEvent } from '@testing-library/react';
import ContrastChecker, { ContrastCheckerProps } from '.';
import APCAContrast from '../../utils/apca-contrast';
import legacyContrast from '../../utils/legacy-ratio';
import wait from '../../utils/test-helpers/wait';

describe('ContrastChecker', () => {
    it('renders default state', () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.6770023420423,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const component = container.children[0];
        expect(component).toHaveClass('contrast-checker');

        const fgInput = container.querySelector<HTMLProteanInputElement>('.foreground-input')!;
        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(fgInput.type).toEqual('color-code');
        expect(fgInput.format).toEqual('hex');
        expect(fgInput.errors).toEqual(undefined);
        expect(bgInput.value).toEqual('#c7b5fb');

        const [fgCVElement, bgCVElement] = container.querySelectorAll<HTMLDivElement>('.field-container .color-values');
        expect(fgCVElement.textContent).toContain('#1a1a1a|rgb(26, 26, 26)');
        expect(bgCVElement.textContent).toContain('#c7b5fb|rgb(199, 181, 251)');

        const contrastValueElement = container.querySelector<HTMLElement>('.contrast-value')!;
        expect(contrastValueElement.textContent?.trim()).toContain('67.677 Lc');

        const checkedRadio = container.querySelector<HTMLInputElement>('input[checked]')!;
        expect(checkedRadio.value).toEqual('hex');
    });

    it('validates hex on foregrount input change', async () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.677,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const fgInput = container.querySelector<HTMLProteanInputElement>('.foreground-input')!;
        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(bgInput.value).toEqual('#c7b5fb');

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#x',
                    formattedValue: '#x',
                },
            })
        );

        await wait(15); //debounce timer - can mock if time becomes a problem

        expect(fgInput.errors).toEqual(['Please enter a valid hex color code']);
        expect(onColorChange).toHaveBeenCalledTimes(0);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1',
                    formattedValue: '#1',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        let foregroundColor = parseInt('111111', 16);
        const backgroundColor = parseInt('c7b5fb', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a',
                    formattedValue: '#1a',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(2);

        foregroundColor = parseInt('1a1a1a', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a2',
                    formattedValue: '#1a2',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(3);

        foregroundColor = parseInt('11aa22', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a25',
                    formattedValue: '#1a25',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(['Please enter a valid hex color code']);
        expect(onColorChange).toHaveBeenCalledTimes(3);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a252',
                    formattedValue: '#1a252',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(['Please enter a valid hex color code']);
        expect(onColorChange).toHaveBeenCalledTimes(3);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a252e',
                    formattedValue: '#1a252e',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(4);

        foregroundColor = parseInt('1a252e', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );
    });

    it('validates hex on foreground color input change', async () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.677,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const fgInput = container.querySelector<HTMLProteanInputElement>('.foreground-color-input')!;

        expect(fgInput.value).toEqual('#1a1a1a');

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a252e',
                    formattedValue: '#1a252e',
                },
            })
        );

        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        const foregroundColor = parseInt('1a252e', 16);
        const backgroundColor = parseInt('c7b5fb', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );
    });

    it('validates hex on background input change', async () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.677,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        expect(bgInput.value).toEqual('#c7b5fb');

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#c',
                    formattedValue: '#c',
                },
            })
        );

        await wait(15); //debounce timer

        expect(bgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        const foregroundColor = parseInt('1a1a1a', 16);
        let backgroundColor = parseInt('cccccc', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#c7b5',
                    formattedValue: '#c7b5f',
                },
            })
        );

        await wait(15); //debounce timer

        expect(bgInput.errors).toEqual(['Please enter a valid hex color code']);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#c7b123',
                    formattedValue: '#c7b123',
                },
            })
        );

        await wait(15); //debounce timer

        expect(bgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(2);

        backgroundColor = parseInt('c7b123', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );
    });

    it('validates hex on background color input change', async () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.677,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-color-input')!;

        expect(bgInput.value).toEqual('#c7b5fb');

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#7209b7',
                    formattedValue: '#7209b7',
                },
            })
        );

        await wait(15); //debounce timer

        expect(bgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        const foregroundColor = parseInt('1a1a1a', 16);
        const backgroundColor = parseInt('7209b7', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );
    });

    it('switches to rgb format', async () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.677,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const fgInput = container.querySelector<HTMLProteanInputElement>('.foreground-input')!;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(fgInput.format).toEqual('hex');

        const rgbRadioElement = container.querySelector<HTMLInputElement>('input[type="radio"][value="rgb"]')!;

        fireEvent(rgbRadioElement, new MouseEvent('click', { bubbles: true }));

        expect(fgInput.value).toEqual('rgb(26, 26, 26)');
        expect(fgInput.format).toEqual('rgb');

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: 'rgb(26, 256, 26)',
                    formattedValue: 'rgb(26, 256, 26)',
                },
            })
        );
        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(['Please enter a valid rgb color code']);
        expect(onColorChange).toHaveBeenCalledTimes(0);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: 'rgb(26, 29, 26)',
                    formattedValue: 'rgb(26, 29, 26)',
                },
            })
        );
        await wait(15); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        const foregroundColor = parseInt('1a1d1a', 16);
        const backgroundColor = parseInt('c7b5fb', 16);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );
    });

    it('runs legacy ratio', async () => {
        const onColorChange = jest.fn();
        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 9.474,
            isAPCA: false,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#7209b7',
                    formattedValue: '#7209b7',
                },
            })
        );

        await wait(15); //debounce timer

        expect(bgInput.errors).toEqual(undefined);
        expect(onColorChange).toHaveBeenCalledTimes(1);

        const foregroundColor = parseInt('1a1a1a', 16);
        const backgroundColor = parseInt('7209b7', 16);
        const rgbForegroundColor = [26, 26, 26];
        const rgbBackgroundColor = [114, 9, 183];
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            legacyContrast(rgbBackgroundColor, rgbForegroundColor)
        );
    });

    it('swaps foreground and background', async () => {
        const onColorChange = jest.fn().mockImplementation();

        const props: ContrastCheckerProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: 67.677,
            isAPCA: true,
            onColorChange,
        };
        const { container } = render(<ContrastChecker {...props} />);

        const colorSwapBtn = container.querySelector('protean-button')!;

        fireEvent.click(colorSwapBtn, { bubble: true });

        const foregroundColor = parseInt('1a1a1a', 16);
        const backgroundColor = parseInt('c7b5fb', 16);
        expect(onColorChange).toHaveBeenCalledTimes(1);
        expect(onColorChange).toHaveBeenCalledWith(
            backgroundColor,
            foregroundColor,
            APCAContrast(foregroundColor, backgroundColor)
        );

        fireEvent.click(colorSwapBtn, { bubbles: true });

        expect(onColorChange).toHaveBeenCalledTimes(2);
        expect(onColorChange).toHaveBeenCalledWith(
            foregroundColor,
            backgroundColor,
            APCAContrast(backgroundColor, foregroundColor)
        );
    });
});
