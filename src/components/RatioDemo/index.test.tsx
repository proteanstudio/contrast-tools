import { fireEvent, render } from '@testing-library/react';
import RatioDemo from '.';
import wait from '../../utils/test-helpers/wait';

describe('Ratio Demo', () => {
    it('renders default state', () => {
        const { container } = render(<RatioDemo />);

        const component = container.children[0];
        expect(component).toHaveClass('ratio-demo');

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const sampleTextItem = container.querySelector<HTMLDivElement>('.sample-text')!;
        const normalAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aa-grade')!;
        const normalAAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aaa-grade')!;
        const largeAAGradeItem = container.querySelector<HTMLDivElement>('.large-aa-grade')!;
        const largeAAAGradeItem = container.querySelector<HTMLDivElement>('.large-aaa-grade')!;

        const foregroundColor = sampleTextItem.style.color;
        const backgroundColor = sampleTextItem.style.backgroundColor;

        expect(foregroundColor).toEqual('rgb(26, 26, 26)');
        expect(backgroundColor).toEqual('rgb(199, 181, 251)');
        expect(contrastValueContainer.textContent).toContain('9.474');
        expect(normalAAGradeItem.textContent).toEqual('pass');
        expect(normalAAAGradeItem.textContent).toEqual('pass');
        expect(largeAAGradeItem.textContent).toEqual('pass');
        expect(largeAAAGradeItem.textContent).toEqual('pass');
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

    it('correctly calculates 4.5 grades', async () => {
        const { container } = render(<RatioDemo />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const normalAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aa-grade')!;
        const largeAAAGradeItem = container.querySelector<HTMLDivElement>('.large-aaa-grade')!;

        expect(contrastValueContainer.textContent).toContain('9.474');
        expect(normalAAGradeItem.textContent).toEqual('pass');
        expect(largeAAAGradeItem.textContent).toEqual('pass');

        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#818181',
                    formattedValue: '#818181',
                },
            })
        );

        await wait(15);

        expect(contrastValueContainer.textContent).toContain('4.468');
        expect(normalAAGradeItem.textContent).toEqual('fail');
        expect(largeAAAGradeItem.textContent).toEqual('fail');

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#828282',
                    formattedValue: '#828282',
                },
            })
        );

        await wait(15);

        expect(contrastValueContainer.textContent).toContain('4.529');
        expect(normalAAGradeItem.textContent).toEqual('pass');
        expect(largeAAAGradeItem.textContent).toEqual('pass');
    });

    it('correctly calculates 7 grade', async () => {
        const { container } = render(<RatioDemo />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const normalAAAGradeItem = container.querySelector<HTMLDivElement>('.normal-aaa-grade')!;

        expect(contrastValueContainer.textContent).toContain('9.474');
        expect(normalAAAGradeItem.textContent).toEqual('pass');

        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#a4a4a4',
                    formattedValue: '#a4a4a4',
                },
            })
        );

        await wait(15);

        expect(contrastValueContainer.textContent).toContain('6.982');
        expect(normalAAAGradeItem.textContent).toEqual('fail');

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#a5a5a5',
                    formattedValue: '#a5a5a5',
                },
            })
        );

        await wait(15);

        expect(contrastValueContainer.textContent).toContain('7.066');
        expect(normalAAAGradeItem.textContent).toEqual('pass');
    });

    it('correctly calculates 3 grade', async () => {
        const { container } = render(<RatioDemo />);

        const contrastValueContainer = container.querySelector<HTMLDivElement>('.contrast-value')!;
        const largeAAGradeItem = container.querySelector<HTMLDivElement>('.large-aa-grade')!;

        expect(contrastValueContainer.textContent).toContain('9.474');
        expect(largeAAGradeItem.textContent).toEqual('pass');

        const bgInput = container.querySelector<HTMLProteanInputElement>('.background-input')!;

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#656565',
                    formattedValue: '#656565',
                },
            })
        );

        await wait(15);

        expect(contrastValueContainer.textContent).toContain('2.986');
        expect(largeAAGradeItem.textContent).toEqual('fail');

        fireEvent(
            bgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#666666',
                    formattedValue: '#666666',
                },
            })
        );

        await wait(15);

        expect(contrastValueContainer.textContent).toContain('3.031');
        expect(largeAAGradeItem.textContent).toEqual('pass');
    });
});
