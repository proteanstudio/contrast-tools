import { render } from '@testing-library/react';
import LookupTableCell, { LookupTableCellProps } from '.';

describe('LookupTableCell', () => {
    it('renders default state', () => {
        const props: LookupTableCellProps = {
            value: 90,
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.children[0] as HTMLDivElement;
        expect(component.className.trim()).toEqual('lookup-table-cell');
        expect(component.localName).toEqual('div');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('90');
        expect(cellValueElement.getAttribute('aria-label')).toEqual(null);

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).toBeNull();
    });

    it('renders accepts alternate tag names', () => {
        const props: LookupTableCellProps = {
            value: 90,
            tag: 'td',
        };

        const { container, rerender } = render(<LookupTableCell {...props} />, {
            container: document.createElement('tr'),
        });

        let component = container.children[0] as HTMLDivElement;

        expect(component.localName).toEqual('td');

        rerender(<LookupTableCell value={90} tag="th" />);

        component = container.children[0] as HTMLDivElement;

        expect(component.localName).toEqual('th');
    });

    it('binds aria label', () => {
        const props: LookupTableCellProps = {
            value: 90,
            tag: 'div',
            ariaLabel: 'Font weight 100',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.getAttribute('aria-label')).toEqual('Font weight 100');
    });

    it('renders prohibited cells', () => {
        const props: LookupTableCellProps = {
            value: 'X',
            decorator: 'prohibited',
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('prohibited');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('X');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).toBeNull();
    });

    it('renders copyright cells', () => {
        const props: LookupTableCellProps = {
            value: '©',
            decorator: 'copyright',
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('copyright');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('©');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).toBeNull();
    });

    it('renders header cells', () => {
        const props: LookupTableCellProps = {
            value: '10px',
            decorator: 'header',
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('header');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('10px');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).toBeNull();
    });

    it('renders placeholder caution cells', () => {
        const props: LookupTableCellProps = {
            value: 'N',
            decorator: 'caution',
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('caution');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('N');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).toBeNull();
    });

    it('renders standard cells', () => {
        const props: LookupTableCellProps = {
            value: 100,
            comparisonValue: 93,
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('rating-2');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('100');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).not.toBeNull();
        expect(cellRatingList?.getAttribute('aria-label')).toEqual('WCAG 3.0 Rating 2');
        expect(cellRatingList?.children.length).toEqual(2);
    });

    it('renders standard caution cells', () => {
        const props: LookupTableCellProps = {
            value: 100,
            comparisonValue: 93,
            decorator: 'caution',
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('rating-2', 'caution');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('100');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).not.toBeNull();
        expect(cellRatingList?.getAttribute('aria-label')).toEqual('WCAG 3.0 Rating 2');
        expect(cellRatingList?.children.length).toEqual(2);
    });

    it('defers to rating prop', () => {
        const props: LookupTableCellProps = {
            value: 100,
            comparisonValue: 93,
            rating: 4,
            tag: 'div',
        };

        const { container } = render(<LookupTableCell {...props} />);

        const component = container.querySelector<HTMLDivElement>('.lookup-table-cell')!;

        expect(component).toHaveClass('rating-4');

        const cellValueElement = container.querySelector<HTMLDivElement>('.cell-value')!;

        expect(cellValueElement.textContent?.trim()).toEqual('100');

        const cellRatingList = container.querySelector('.cell-rating');

        expect(cellRatingList).not.toBeNull();
        expect(cellRatingList?.getAttribute('aria-label')).toEqual('WCAG 3.0 Rating 4');
        expect(cellRatingList?.children.length).toEqual(4);
    });
});
