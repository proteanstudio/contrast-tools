import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

describe('App', () => {
    test('renders default state', () => {
        const { container } = render(<App />);

        const component = container.children[0];
        expect(component).toHaveClass('app', 'content');

        expect(container.querySelector('h1')?.textContent?.trim()).toEqual('Contrast checker');
    });
});
