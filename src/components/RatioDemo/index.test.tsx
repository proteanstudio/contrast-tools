import { fireEvent, render } from '@testing-library/react';
import RatioDemo from '.';

describe('Ratio Demo', () => {
    it('renders default state', () => {
        const { container } = render(<RatioDemo />);

        const component = container.children[0];
        expect(component).toHaveClass('ratio-demo');

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-text')!;

        const foregroundColor = sampleTextItem.style.color;
        const backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(26, 26, 26)');
        expect(backgroundColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('9.474');
    });

    it('updates state onColorChange', () => {
        const { container } = render(<RatioDemo />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-container .sample-text')!;
        let foregroundColor = sampleTextItem.style.color;
        let backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(26, 26, 26)');
        expect(backgroundColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('9.474');

        const colorSwapBtn = container.querySelector('.contrast-checker protean-button')!;

        fireEvent.click(colorSwapBtn);

        foregroundColor = sampleTextItem.style.color;
        backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(199, 181, 251)');
        expect(backgroundColor).toEqual('rgb(26, 26, 26)');
        expect(contrastValueContainer.textContent).toContain('9.474');
    });
});
