import { act, render, fireEvent, waitFor } from '@testing-library/react';
import ContrastChecker, { ContrastCheckerProps } from '.';
import wait from '../../utils/test-helpers/wait';
import { APCAcontrast, sRGBtoY } from 'apca-w3';
import { jest } from '@jest/globals';

describe('ContrastChecker', () => {
    const foregroundColor = {
        hexString: '#1a1a1a',
        rgbString: 'rgb(26, 26, 26)',
        activeColor: '#1a1a1a',
        hexNumber: parseInt('1a1a1a', 16),
        rgb: [26, 26, 26],
    };

    const backgroundColor = {
        hexString: '#c7b5fb',
        rgbString: 'rgb(199, 181, 251)',
        activeColor: '#c7b5fb',
        hexNumber: parseInt('c7b5fb', 16),
        rgb: [199, 181, 251],
    };

    it('renders default state', () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };

        const { container } = render(<ContrastChecker {...props} />);

        const component = container.children[0];
        expect(component).toHaveClass('contrast-checker');

        const fgInput = container.querySelector('.foreground-input') as HTMLProteanInputElement;
        const bgInput = container.querySelector('.background-input') as HTMLProteanInputElement;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(fgInput.type).toEqual('color-code');
        expect(fgInput.format).toEqual('hex');
        expect(fgInput.errors).toEqual(undefined);
        expect(bgInput.value).toEqual('#c7b5fb');

        const [fgCVElement, bgCVElement] = container.querySelectorAll<HTMLDivElement>('.field-container .color-values');
        expect(fgCVElement.textContent).toContain('#1a1a1a|rgb(26, 26, 26)');
        expect(bgCVElement.textContent).toContain('#c7b5fb|rgb(199, 181, 251)');

        const contrastValueElement = container.querySelector('.contrast-value') as HTMLElement;
        expect(contrastValueElement.textContent?.trim()).toContain('68 Lc');

        const checkedRadio = container.querySelector('input[checked]') as HTMLInputElement;
        expect(checkedRadio.value).toEqual('hex');
    });

    it('validates hex on foreground input change', async () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };
        const { container } = render(<ContrastChecker {...props} />);

        const fgInput = container.querySelector('.foreground-input') as HTMLProteanInputElement;
        const bgInput = container.querySelector('.background-input') as HTMLProteanInputElement;

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

        await waitFor(() => expect(fgInput.errors).toEqual(['Please enter a valid hex color code']));
        expect(props.onColorChange).toHaveBeenCalledTimes(0);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1',
                    formattedValue: '#1',
                },
            })
        );

        await waitFor(() => expect(fgInput.errors).toEqual(undefined));
        expect(props.onColorChange).toHaveBeenCalledTimes(1);

        let updatedForegroundColor: IColorData = {
            hexString: '#111111',
            rgbString: 'rgb(17, 17, 17)',
            activeColor: '#1',
            hexNumber: parseInt('111111', 16),
            rgb: [17, 17, 17],
        };

        expect(props.onColorChange).toHaveBeenCalledWith(updatedForegroundColor, backgroundColor);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a',
                    formattedValue: '#1a',
                },
            })
        );

        await waitFor(() => expect(props.onColorChange).toHaveBeenCalledTimes(2));
        expect(fgInput.errors).toEqual(undefined);

        updatedForegroundColor = {
            ...foregroundColor,
            activeColor: '#1a',
        };
        expect(props.onColorChange).toHaveBeenCalledWith(updatedForegroundColor, backgroundColor);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a2',
                    formattedValue: '#1a2',
                },
            })
        );

        await waitFor(() => expect(props.onColorChange).toHaveBeenCalledTimes(3));
        expect(fgInput.errors).toEqual(undefined);

        updatedForegroundColor = {
            hexString: '#11aa22',
            rgbString: 'rgb(17, 170, 34)',
            activeColor: '#1a2',
            hexNumber: parseInt('11aa22', 16),
            rgb: [17, 170, 34],
        };

        expect(props.onColorChange).toHaveBeenCalledWith(updatedForegroundColor, backgroundColor);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a25',
                    formattedValue: '#1a25',
                },
            })
        );

        await waitFor(() => expect(fgInput.errors).toEqual(['Please enter a valid hex color code']));
        expect(props.onColorChange).toHaveBeenCalledTimes(3);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a252',
                    formattedValue: '#1a252',
                },
            })
        );

        await act(async () => wait(5)); //debounce timer

        expect(fgInput.errors).toEqual(['Please enter a valid hex color code']);
        expect(props.onColorChange).toHaveBeenCalledTimes(3);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#1a252e',
                    formattedValue: '#1a252e',
                },
            })
        );

        await waitFor(() => expect(fgInput.errors).toEqual(undefined));
        expect(props.onColorChange).toHaveBeenCalledTimes(4);

        updatedForegroundColor = {
            hexString: '#1a252e',
            rgbString: 'rgb(26, 37, 46)',
            activeColor: '#1a252e',
            hexNumber: parseInt('1a252e', 16),
            rgb: [26, 37, 46],
        };
        expect(props.onColorChange).toHaveBeenCalledWith(updatedForegroundColor, backgroundColor);
    });

    it('validates hex on foreground color input change', async () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };
        const { container } = render(<ContrastChecker {...props} />);

        const fgInput = container.querySelector('.foreground-color-input') as HTMLProteanInputElement;

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

        await wait(5); //debounce timer

        expect(fgInput.errors).toEqual(undefined);
        expect(props.onColorChange).toHaveBeenCalledTimes(1);

        const updatedForegroundColor: IColorData = {
            hexString: '#1a252e',
            rgbString: 'rgb(26, 37, 46)',
            activeColor: '#1a252e',
            hexNumber: parseInt('1a252e', 16),
            rgb: [26, 37, 46],
        };
        expect(props.onColorChange).toHaveBeenCalledWith(updatedForegroundColor, backgroundColor);
    });

    it('validates hex on background input change', async () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };
        const { container } = render(<ContrastChecker {...props} />);

        const bgInput = container.querySelector('.background-input') as HTMLProteanInputElement;

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

        await wait(5); //debounce timer

        expect(bgInput.errors).toEqual(undefined);
        expect(props.onColorChange).toHaveBeenCalledTimes(1);

        let updatedBackgroundColor: IColorData = {
            hexString: '#cccccc',
            rgbString: 'rgb(204, 204, 204)',
            activeColor: '#c',
            hexNumber: parseInt('cccccc', 16),
            rgb: [204, 204, 204],
        };
        expect(props.onColorChange).toHaveBeenCalledWith(foregroundColor, updatedBackgroundColor);

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#c7b5',
                    formattedValue: '#c7b5f',
                },
            })
        );

        await waitFor(() => expect(bgInput.errors).toEqual(['Please enter a valid hex color code']));
        expect(props.onColorChange).toHaveBeenCalledTimes(1);

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#c7b123',
                    formattedValue: '#c7b123',
                },
            })
        );

        await waitFor(() => expect(bgInput.errors).toEqual(undefined));
        expect(props.onColorChange).toHaveBeenCalledTimes(2);

        updatedBackgroundColor = {
            hexString: '#c7b123',
            rgbString: 'rgb(199, 177, 35)',
            activeColor: '#c7b123',
            hexNumber: parseInt('c7b123', 16),
            rgb: [199, 177, 35],
        };

        expect(props.onColorChange).toHaveBeenCalledWith(foregroundColor, updatedBackgroundColor);
    });

    it('validates hex on background color input change', async () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };
        const { container } = render(<ContrastChecker {...props} />);

        const bgInput = container.querySelector('.background-color-input') as HTMLProteanInputElement;

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

        await wait(5); //debounce timer

        expect(bgInput.errors).toEqual(undefined);
        expect(props.onColorChange).toHaveBeenCalledTimes(1);

        const updatedBackgroundColor: IColorData = {
            hexString: '#7209b7',
            rgbString: 'rgb(114, 9, 183)',
            activeColor: '#7209b7',
            hexNumber: parseInt('7209b7', 16),
            rgb: [114, 9, 183],
        };
        expect(props.onColorChange).toHaveBeenCalledWith(foregroundColor, updatedBackgroundColor);
    });

    it('switches to rgb format', async () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };
        const { container, rerender } = render(<ContrastChecker {...props} />);

        expect(props.onHexSwap).toHaveBeenCalledTimes(0);

        const fgInput = container.querySelector('.foreground-input') as HTMLProteanInputElement;
        const fgColorInput = container.querySelector('.foreground-color-input') as HTMLProteanInputElement;
        const bgInput = container.querySelector('.background-input') as HTMLProteanInputElement;
        const bgColorInput = container.querySelector('.background-color-input') as HTMLProteanInputElement;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(fgInput.format).toEqual('hex');

        const rgbRadioElement = container.querySelector('input[type="radio"][value="rgb"]') as HTMLInputElement;

        fireEvent(rgbRadioElement, new MouseEvent('click', { bubbles: true }));

        expect(props.onHexSwap).toHaveBeenCalledTimes(1);
        expect(props.onHexSwap).toHaveBeenCalledWith(false);

        props.isHex = false;
        rerender(<ContrastChecker {...props} />);

        fireEvent(
            fgColorInput,
            new CustomEvent('input', {
                detail: {
                    value: 'rgb(26, 256, 26)',
                    formattedValue: 'rgb(26, 256, 26)',
                },
            })
        );

        await waitFor(() => expect(fgInput.errors).toEqual(['Please enter a valid rgb color code']));
        expect(props.onColorChange).toHaveBeenCalledTimes(0);

        fireEvent(
            bgColorInput,
            new CustomEvent('input', {
                detail: {
                    value: 'rgb(26, 256, 26)',
                    formattedValue: 'rgb(26, 256, 26)',
                },
            })
        );
        await waitFor(() => expect(bgInput.errors).toEqual(['Please enter a valid rgb color code']));
        expect(props.onColorChange).toHaveBeenCalledTimes(0);

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: 'rgb(26, 29, 26)',
                    formattedValue: 'rgb(26, 29, 26)',
                },
            })
        );

        await waitFor(() => expect(fgInput.errors).toEqual(undefined));
        expect(props.onColorChange).toHaveBeenCalledTimes(1);

        const updatedForegroundColor: IColorData = {
            hexString: '#1a1d1a',
            rgbString: 'rgb(26, 29, 26)',
            activeColor: 'rgb(26, 29, 26)',
            hexNumber: parseInt('1a1d1a', 16),
            rgb: [26, 29, 26],
        };

        expect(props.onColorChange).toHaveBeenCalledWith(updatedForegroundColor, backgroundColor);
    });

    it('swaps foreground and background', () => {
        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };

        const { container, rerender } = render(<ContrastChecker {...props} />);

        const colorSwapBtn = container.querySelector('.swap-colors') as HTMLProteanButtonElement;

        fireEvent.click(colorSwapBtn);

        expect(props.onColorChange).toHaveBeenCalledTimes(1);
        expect(props.onColorChange).toHaveBeenCalledWith(backgroundColor, foregroundColor);

        props.foregroundColor = backgroundColor;
        props.backgroundColor = foregroundColor;
        rerender(<ContrastChecker {...props} />);

        fireEvent.click(colorSwapBtn);

        expect(props.onColorChange).toHaveBeenCalledTimes(2);
        expect(props.onColorChange).toHaveBeenCalledWith(foregroundColor, backgroundColor);
    });

    it('copies colors to clipboard ', async () => {
        const writeTextMock = jest.fn().mockImplementation(() => Promise.resolve());

        (window.navigator as unknown as IDict).clipboard = { writeText: writeTextMock };

        const props: ContrastCheckerProps = {
            foregroundColor,
            backgroundColor,
            contrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            isAPCA: true,
            isHex: true,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
        };

        const { container } = render(<ContrastChecker {...props} />);

        const copyBtn = container.querySelector('.copy-button') as HTMLProteanButtonElement;

        jest.useFakeTimers();

        fireEvent.click(copyBtn);

        expect(writeTextMock).toHaveBeenCalledTimes(1);
        expect(writeTextMock).toHaveBeenCalledWith(`${location.origin}?text=1a1a1a&background=c7b5fb`);

        await waitFor(() => expect(container.querySelector('.copy-confirmation')).toBeInTheDocument());

        await act(() => {
            jest.runOnlyPendingTimers();
        });

        await waitFor(() => expect(container.querySelector('.copy-confirmation')).toBeNull());

        (window.navigator as unknown as IDict).clipboard = undefined;
    });
});
