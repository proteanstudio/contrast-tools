import { render, fireEvent } from '@testing-library/react';
import App from '.';

describe('App', () => {
    it('renders default state', () => {
        const { container } = render(<App />);

        const component = container.children[0];
        expect(component).toHaveClass('app', 'content');

        expect(container.querySelector('h1')?.textContent?.trim()).toEqual('Contrast checker');

        const tabContainer = container.querySelector('protean-tab-container');
        expect(tabContainer?.value).toEqual('wcag-30');

        const darkModeToggle = container.querySelector<HTMLProteanCheckboxElement>('.dark-mode-toggle');
        expect(darkModeToggle?.checked).toEqual(false);
        expect(localStorage.getItem('darkModeEnabled')).toEqual(null);
    });

    it('changes tabs', () => {
        const { container } = render(<App />);

        const tabContainer = container.querySelector('protean-tab-container')!;
        expect(tabContainer.value).toEqual('wcag-30');

        fireEvent(
            tabContainer,
            new CustomEvent('change', {
                detail: {
                    value: 'wcag-21',
                },
            })
        );

        expect(tabContainer.value).toEqual('wcag-21');
    });

    it('toggles dark mode', () => {
        document.documentElement.classList.add('light');

        const { container } = render(<App />);

        const darkModeToggle = container.querySelector<HTMLProteanCheckboxElement>('.dark-mode-toggle')!;

        expect(darkModeToggle.checked).toEqual(false);
        expect(localStorage.getItem('darkModeEnabled')).toEqual(null);
        expect(document.documentElement).toHaveClass('light');

        fireEvent(
            darkModeToggle,
            new CustomEvent('change', {
                detail: {
                    checked: true,
                },
            })
        );

        expect(darkModeToggle.checked).toEqual(true);
        expect(localStorage.getItem('darkModeEnabled')).toEqual('true');
        expect(document.documentElement).not.toHaveClass('light');
    });

    it('inits dark mode from localStorage', () => {
        document.documentElement.classList.add('light');
        localStorage.setItem('darkModeEnabled', 'true');

        const { container } = render(<App />);

        const darkModeToggle = container.querySelector<HTMLProteanCheckboxElement>('.dark-mode-toggle')!;
        expect(darkModeToggle.checked).toEqual(true);
        expect(document.documentElement).not.toHaveClass('light');

        localStorage.removeItem('darkModeEnabled');
    });
});
