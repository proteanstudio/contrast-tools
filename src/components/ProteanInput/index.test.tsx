import { fireEvent, render } from '@testing-library/react';
import ProteanInput from '.';
import { jest } from '@jest/globals';

describe('ProteanInput', () => {
    it('binds all named properties', () => {
        const onchange = jest.fn<any>().mockImplementation((event: CustomEvent) => {
            (event.target as HTMLProteanInputElement).value = event.detail.value;
        });
        const oninput = jest.fn<any>().mockImplementation((event: CustomEvent) => {
            (event.target as HTMLProteanInputElement).value = event.detail.value;
        });

        const props: IProteanInput = {
            className: 'test-class',
            a11yLabel: 'test-a11y-label',
            ariaExpanded: false,
            ariaHasPopup: 'false',
            ariaRole: '',
            disabled: false,
            errors: ['error 1'],
            format: 'hex',
            hints: ['hint 1'],
            label: 'test-label',
            maxlength: 10,
            onchange,
            oninput,
            optional: false,
            readonly: false,
            suppressMessages: false,
            type: 'color-code',
            value: '#1a1a1a',
        };

        const { container } = render(<ProteanInput {...props} />);

        const proteanInputElement = container.querySelector('protean-input')!;

        expect(proteanInputElement.className).toEqual('test-class');
        expect(proteanInputElement.a11yLabel).toEqual('test-a11y-label');
        expect(proteanInputElement.ariaExpanded).toEqual(false);
        expect(proteanInputElement.ariaHasPopup).toEqual('false');
        expect(proteanInputElement.ariaRole).toEqual('');
        expect(proteanInputElement.disabled).toEqual(false);
        expect(proteanInputElement.errors).toEqual(['error 1']);
        expect(proteanInputElement.format).toEqual('hex');
        expect(proteanInputElement.hints).toEqual(['hint 1']);
        expect(proteanInputElement.label).toEqual('test-label');
        expect(proteanInputElement.maxlength).toEqual(10);
        expect(proteanInputElement.onchange).toEqual(onchange);
        expect(onchange).toHaveBeenCalledTimes(0);
        expect(proteanInputElement.oninput).toEqual(oninput);
        expect(oninput).toHaveBeenCalledTimes(0);
        expect(proteanInputElement.optional).toEqual(false);
        expect(proteanInputElement.readonly).toEqual(false);
        expect(proteanInputElement.suppressMessages).toEqual(false);
        expect(proteanInputElement.type).toEqual('color-code');
        expect(proteanInputElement.value).toEqual('#1a1a1a');

        const changeEvent = new CustomEvent('change', {
            detail: {
                value: '#c7b5fb',
                formattedValue: '#c7b5fb',
            },
        });

        fireEvent(proteanInputElement, changeEvent);

        expect(onchange).toHaveBeenCalledTimes(1);
        expect(onchange).toHaveBeenCalledWith(changeEvent);
        expect(proteanInputElement.value).toEqual('#c7b5fb');

        const inputEvent = new CustomEvent('input', {
            detail: {
                value: '#000000',
                formattedValue: '#000000',
            },
        });

        fireEvent(proteanInputElement, inputEvent);

        expect(oninput).toHaveBeenCalledTimes(1);
        expect(oninput).toHaveBeenCalledWith(inputEvent);
        expect(proteanInputElement.value).toEqual('#000000');
    });
});
