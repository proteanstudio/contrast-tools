import { render } from '@testing-library/react';
import SampleText, { SampleTextProps } from '.';

describe('SampleText', () => {
    it('renders default state', () => {
        const props: SampleTextProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            fontSize: '16px',
            fontWeight: 600,
            text: 'Sample text test',
        };

        const { container } = render(<SampleText {...props} />);

        const component = container.children[0] as HTMLDivElement;
        expect(component).toHaveClass('sample-text');
        expect(component.style.backgroundColor).toEqual('rgb(199, 181, 251)');
        expect(component.style.color).toEqual('rgb(26, 26, 26)');

        const mainTextElement = container.querySelector<HTMLDivElement>('.main-text')!;

        expect(mainTextElement.style.fontSize).toEqual('16px');
        expect(mainTextElement.style.fontWeight).toEqual('600');

        const ratingTextElement = container.querySelector('.rating-text');

        expect(ratingTextElement).toBeNull();
    });

    it('renders rating text', () => {
        const props: SampleTextProps = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            fontSize: '16px',
            fontWeight: 600,
            text: 'Sample text test',
            rating: 4,
        };

        const { container } = render(<SampleText {...props} />);

        const ratingTextElement = container.querySelector('.rating-text');

        expect(ratingTextElement).not.toBeNull();
        expect(ratingTextElement?.textContent?.trim()).toEqual('Rating: 4');
    });
});
