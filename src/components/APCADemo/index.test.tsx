import { render } from '@testing-library/react';
import APCADemo from '.';

describe('APCA Demo', () => {
    it('renders default state', () => {
        const { container } = render(<APCADemo />);

        const component = container.children[0];
        expect(component).toHaveClass('apca-demo');
    });
});
