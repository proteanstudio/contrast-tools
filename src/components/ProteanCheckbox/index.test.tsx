import { fireEvent, render } from '@testing-library/react';
import ProteanCheckbox from '.';
import { jest } from '@jest/globals';

describe('ProteanCheckbox', () => {
    it('binds all named properties', () => {
        const onchange = jest.fn<(event: CustomEvent) => void>().mockImplementation((event: CustomEvent) => {
            (event.target as HTMLProteanCheckboxElement).checked = event.detail.checked;
        });

        const props: IProteanCheckbox = {
            className: 'test-checkbox',
            a11yLabel: 'test-a11y-label',
            alignment: 'left',
            checked: true,
            disabled: false,
            indeterminate: false,
            label: 'test-label',
            onchange,
            variant: 'toggle',
        };
        const { container } = render(<ProteanCheckbox {...props} />);

        const proteanCheckboxElement = container.querySelector('protean-checkbox') as HTMLProteanCheckboxElement;

        expect(proteanCheckboxElement.className).toEqual('test-checkbox');
        expect(proteanCheckboxElement.a11yLabel).toEqual('test-a11y-label');
        expect(proteanCheckboxElement.alignment).toEqual('left');
        expect(proteanCheckboxElement.checked).toEqual(true);
        expect(proteanCheckboxElement.disabled).toEqual(false);
        expect(proteanCheckboxElement.indeterminate).toEqual(false);
        expect(proteanCheckboxElement.label).toEqual('test-label');
        expect(proteanCheckboxElement.onchange).toEqual(onchange);
        expect(onchange).toHaveBeenCalledTimes(0);
        expect(proteanCheckboxElement.variant).toEqual('toggle');

        const event = new CustomEvent('change', {
            detail: {
                checked: false,
            },
        });
        fireEvent(proteanCheckboxElement, event);

        expect(onchange).toHaveBeenCalledTimes(1);
        expect(onchange).toHaveBeenCalledWith(event);
        expect(proteanCheckboxElement.checked).toEqual(false);
    });
});
