import { fireEvent, render } from '@testing-library/react';
import ProteanTabContainer from '.';
import { jest } from '@jest/globals';

describe('ProteanTabContainer', () => {
    it('binds all named properties', () => {
        const onchange = jest.fn<any>().mockImplementation((event: CustomEvent) => {
            (event.target as HTMLProteanTabContainerElement).value = event.detail.value;
        });

        const props: IProteanTabContainer = {
            className: 'test-class',
            value: 'apca',
            name: 'test-name',
            onchange,
        };

        const { container } = render(
            <ProteanTabContainer {...props}>
                <div className="child-items"></div>
            </ProteanTabContainer>
        );

        const proteanTabContainerElement = container.querySelector('protean-tab-container')!;

        expect(proteanTabContainerElement.className).toEqual('test-class');
        expect(proteanTabContainerElement.onchange).toEqual(onchange);
        expect(onchange).toHaveBeenCalledTimes(0);
        expect(proteanTabContainerElement.value).toEqual('apca');
        expect(proteanTabContainerElement.name).toEqual('test-name');
        expect(proteanTabContainerElement.querySelector('.child-items')).not.toBeNull();

        const changeEvent = new CustomEvent('change', {
            detail: {
                value: 'wcag-21',
            },
        });

        fireEvent(proteanTabContainerElement, changeEvent);

        expect(onchange).toHaveBeenCalledTimes(1);
        expect(onchange).toHaveBeenCalledWith(changeEvent);
        expect(proteanTabContainerElement.value).toEqual('wcag-21');
    });
});
