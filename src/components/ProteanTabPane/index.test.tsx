import { render } from '@testing-library/react';
import ProteanTabPane from '.';

describe('ProteanTabPane', () => {
    it('binds all named properties', () => {
        const props: IProteanTabPane = {
            value: 'apca',
            name: 'test-name',
            label: 'test-label',
        };

        const { container } = render(
            <ProteanTabPane {...props}>
                <div className="child-items"></div>
            </ProteanTabPane>
        );

        const proteanTabPaneElement = container.querySelector('protean-tab-pane') as HTMLProteanTabPaneElement;

        expect(proteanTabPaneElement.getAttribute('value')).toEqual('apca');
        expect(proteanTabPaneElement.getAttribute('name')).toEqual('test-name');
        expect(proteanTabPaneElement.getAttribute('label')).toEqual('test-label');
        expect(proteanTabPaneElement.querySelector('.child-items')).not.toBeNull();
    });
});
