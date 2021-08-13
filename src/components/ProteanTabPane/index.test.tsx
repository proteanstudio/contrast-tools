import { fireEvent, render } from '@testing-library/react';
import ProteanTabPane from '.';

describe('ProteanTabPane', () => {
    it('binds all named properties', () => {
        const props: IProteanTabPane = {
            value: 'wcag-30',
            name: 'test-name',
            label: 'test-label',
        };

        const { container } = render(
            <ProteanTabPane {...props}>
                <div className="child-items"></div>
            </ProteanTabPane>
        );

        const proteanTabPaneElement = container.querySelector('protean-tab-pane')!;

        expect(proteanTabPaneElement.getAttribute('value')).toEqual('wcag-30');
        expect(proteanTabPaneElement.getAttribute('name')).toEqual('test-name');
        expect(proteanTabPaneElement.getAttribute('label')).toEqual('test-label');
        expect(proteanTabPaneElement.querySelector('.child-items')).not.toBeNull();
    });
});
