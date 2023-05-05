import { fireEvent, render } from '@testing-library/react';
import RatioDemo, { RatioDemoProps } from '.';
import legacyContrast from '../../utils/legacy-ratio';
import { jest } from '@jest/globals';

describe('Ratio Demo', () => {
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
        const props: RatioDemoProps = {
            contrastValue: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };
        const { container } = render(<RatioDemo {...props} />);

        const component = container.children[0];
        expect(component).toHaveClass('ratio-demo');

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-text')!;
        const normalAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aa-grade')!;
        const normalAAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aaa-grade')!;
        const largeAAGradeItem = container.querySelector<HTMLDivElement>('.large-aa-grade')!;
        const largeAAAGradeItem = container.querySelector<HTMLDivElement>('.large-aaa-grade')!;

        const fgColor = sampleTextItem.style.color;
        const bgColor = sampleTextItem.style.backgroundColor;

        expect(fgColor).toEqual('rgb(26, 26, 26)');
        expect(bgColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('9.47');
        expect(normalAAGradeItem.textContent).toEqual('pass');
        expect(normalAAAGradeItem.textContent).toEqual('pass');
        expect(largeAAGradeItem.textContent).toEqual('pass');
        expect(largeAAAGradeItem.textContent).toEqual('pass');
    });

    it('updates state onColorChange', () => {
        const props: RatioDemoProps = {
            contrastValue: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container } = render(<RatioDemo {...props} />);

        expect(props.onColorChange).toHaveBeenCalledTimes(0);

        const colorSwapBtn = container.querySelector('.contrast-checker protean-button')!;

        fireEvent.click(colorSwapBtn);

        expect(props.onColorChange).toHaveBeenCalledTimes(1);
        expect(props.onColorChange).toHaveBeenCalledWith(backgroundColor, foregroundColor);
    });

    it('updates state onHexSwap', () => {
        const props: RatioDemoProps = {
            contrastValue: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container } = render(<RatioDemo {...props} />);

        expect(props.onHexSwap).toHaveBeenCalledTimes(0);

        const rgbRadio = container.querySelector<HTMLInputElement>('input[type="radio"][value="rgb"]')!;

        fireEvent.click(rgbRadio);

        expect(props.onHexSwap).toHaveBeenCalledTimes(1);
        expect(props.onHexSwap).toHaveBeenCalledWith(false);
    });

    it('correctly calculates 4.5 grades', () => {
        let props: RatioDemoProps = {
            contrastValue: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container, rerender } = render(<RatioDemo {...props} />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const normalAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aa-grade')!;
        const largeAAAGradeItem = container.querySelector<HTMLDivElement>('.large-aaa-grade')!;

        expect(contrastValueContainer.textContent).toContain('9.47');
        expect(normalAAGradeItem.textContent).toEqual('pass');
        expect(largeAAAGradeItem.textContent).toEqual('pass');

        props.contrastValue = 4.468453; // #818181 bg
        rerender(<RatioDemo {...props} />);

        expect(contrastValueContainer.textContent).toContain('4.47');
        expect(normalAAGradeItem.textContent).toEqual('fail');
        expect(largeAAAGradeItem.textContent).toEqual('fail');

        props.contrastValue = 4.529232; // #828282 bg
        rerender(<RatioDemo {...props} />);

        expect(contrastValueContainer.textContent).toContain('4.53');
        expect(normalAAGradeItem.textContent).toEqual('pass');
        expect(largeAAAGradeItem.textContent).toEqual('pass');
    });

    it('correctly calculates 7 grade', () => {
        let props: RatioDemoProps = {
            contrastValue: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container, rerender } = render(<RatioDemo {...props} />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const normalAAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aaa-grade')!;

        expect(contrastValueContainer.textContent).toContain('9.47');
        expect(normalAAAGradeItem.textContent).toEqual('pass');

        props.contrastValue = 6.982; // #a4a4a4 bg
        rerender(<RatioDemo {...props} />);

        expect(contrastValueContainer.textContent).toContain('6.98');
        expect(normalAAAGradeItem.textContent).toEqual('fail');

        props.contrastValue = 7.066; // #a5a5a5 bg
        rerender(<RatioDemo {...props} />);

        expect(contrastValueContainer.textContent).toContain('7.07');
        expect(normalAAAGradeItem.textContent).toEqual('pass');
    });

    it('correctly calculates 3 grade', () => {
        let props: RatioDemoProps = {
            contrastValue: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            foregroundColor,
            backgroundColor,
            onColorChange: jest.fn(),
            onHexSwap: jest.fn(),
            isHex: true,
        };

        const { container, rerender } = render(<RatioDemo {...props} />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const largeAAGradeItem = container.querySelector<HTMLDivElement>('.large-aa-grade')!;

        expect(contrastValueContainer.textContent).toContain('9.47');
        expect(largeAAGradeItem.textContent).toEqual('pass');

        props.contrastValue = 2.986; // #656565 bg
        rerender(<RatioDemo {...props} />);

        expect(contrastValueContainer.textContent).toContain('2.99');
        expect(largeAAGradeItem.textContent).toEqual('fail');

        props.contrastValue = 3.031; // #666666 bg
        rerender(<RatioDemo {...props} />);

        expect(contrastValueContainer.textContent).toContain('3.03');
        expect(largeAAGradeItem.textContent).toEqual('pass');
    });
});
