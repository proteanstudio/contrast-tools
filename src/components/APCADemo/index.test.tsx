import { fireEvent, render } from '@testing-library/react';
import APCADemo, { APCADemoProps } from '.';
import { APCAcontrast, sRGBtoY } from '../../utils/apca-contrast';

describe('APCA Demo', () => {
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
        const contrastValue = APCAcontrast(sRGBtoY(foregroundColor.hexNumber), sRGBtoY(backgroundColor.hexNumber));
        const props: APCADemoProps = {
            contrastValue,
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container } = render(<APCADemo {...props} />);

        const component = container.children[0];
        expect(component).toHaveClass('apca-demo');

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-container .sample-text')!;

        const fgColor = sampleTextItem.style.color;
        const bgColor = sampleTextItem.style.backgroundColor;

        expect(fgColor).toEqual('rgb(26, 26, 26)');
        expect(bgColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('68');
    });

    it('fires onColorChange', () => {
        const contrastValue = APCAcontrast(sRGBtoY(foregroundColor.hexNumber), sRGBtoY(backgroundColor.hexNumber));
        const props: APCADemoProps = {
            contrastValue,
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container } = render(<APCADemo {...props} />);

        expect(props.onColorChange).toHaveBeenCalledTimes(0);

        const colorSwapBtn = container.querySelector('.contrast-checker protean-button')!;

        fireEvent.click(colorSwapBtn);

        expect(props.onColorChange).toHaveBeenCalledTimes(1);
        expect(props.onColorChange).toHaveBeenCalledWith(backgroundColor, foregroundColor);
    });

    it('fires onHexSwap', () => {
        const contrastValue = APCAcontrast(sRGBtoY(foregroundColor.hexNumber), sRGBtoY(backgroundColor.hexNumber));
        const props: APCADemoProps = {
            contrastValue,
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container } = render(<APCADemo {...props} />);

        expect(props.onHexSwap).toHaveBeenCalledTimes(0);

        const rgbRadio = container.querySelector<HTMLInputElement>('input[type="radio"][value="rgb"]')!;

        fireEvent.click(rgbRadio);

        expect(props.onHexSwap).toHaveBeenCalledTimes(1);
        expect(props.onHexSwap).toHaveBeenCalledWith(false);
    });
});
