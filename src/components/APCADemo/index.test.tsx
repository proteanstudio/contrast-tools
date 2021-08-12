import { fireEvent, render } from '@testing-library/react';
import APCADemo from '.';

describe('APCA Demo', () => {
    it('renders default state', () => {
        const { container } = render(<APCADemo />);

        const component = container.children[0];
        expect(component).toHaveClass('apca-demo');

        const contrastValueContainer =  container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-container .sample-text')!;

        const foregroundColor = sampleTextItem.style.color;
        const backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(26, 26, 26)');
        expect(backgroundColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('67.677');
    });

    it('updates state onColorChange', () => {
        const { container } = render(<APCADemo />);

        
        const contrastValueContainer =  container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-container .sample-text')!;
        let foregroundColor = sampleTextItem.style.color;
        let backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(26, 26, 26)');
        expect(backgroundColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('67.677');

        const colorSwapBtn = container.querySelector('.contrast-checker protean-button')!;

        fireEvent.click(colorSwapBtn);

        foregroundColor = sampleTextItem.style.color;
        backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(199, 181, 251)');
        expect(backgroundColor).toEqual('rgb(26, 26, 26)');
        expect(contrastValueContainer.textContent).toContain('-66.807');
    });
});
