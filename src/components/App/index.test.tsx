import { render, fireEvent } from '@testing-library/react';
import App from '.';
import APCAContrast from '../../utils/apca-contrast';
import legacyContrast from '../../utils/legacy-ratio';
import wait from '../../utils/test-helpers/wait';

describe('App', () => {
    it('renders default state', () => {
        const { container } = render(<App />);

        const component = container.children[0];
        expect(component).toHaveClass('app', 'content');

        expect(container.querySelector('h1')?.textContent?.trim()).toEqual('Contrast tools');

        const tabContainer = container.querySelector('protean-tab-container');
        expect(tabContainer?.value).toEqual('wcag-30');

        const darkModeToggle = container.querySelector<HTMLProteanCheckboxElement>('.dark-mode-toggle');
        expect(darkModeToggle?.checked).toEqual(false);
        expect(localStorage.getItem('darkModeEnabled')).toEqual(null);

        const APCAContrastValue = APCAContrast(parseInt('c7b5fb', 16), parseInt('1a1a1a', 16));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(3));

        const legacyContrastValue = legacyContrast([26, 26, 26], [199, 181, 251]);

        const legacyContrastValueElem = container.querySelector<HTMLDivElement>('.ratio-demo .contrast-value')!;

        expect(legacyContrastValueElem.textContent).toContain(legacyContrastValue.toFixed(3));
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

    it('updates state onColorChange', async () => {
        const { container } = render(<App />);

        let APCAContrastValue = APCAContrast(parseInt('c7b5fb', 16), parseInt('1a1a1a', 16));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(3));

        let legacyContrastValue = legacyContrast([26, 26, 26], [199, 181, 251]);

        const legacyContrastValueElem = container.querySelector<HTMLDivElement>('.ratio-demo .contrast-value')!;

        expect(legacyContrastValueElem.textContent).toContain(legacyContrastValue.toFixed(3));

        const fgInput = container.querySelector<HTMLProteanInputElement>('.apca-demo .foreground-input')!;
        const fgRatioInput = container.querySelector<HTMLProteanInputElement>('.ratio-demo .foreground-input')!;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(fgRatioInput.value).toEqual('#1a1a1a');

        const fgValue = container.querySelector<HTMLDivElement>('.apca-demo .color-values')!;
        const fgRatioValue = container.querySelector<HTMLDivElement>('.ratio-demo .color-values')!;

        expect(fgValue.textContent).toContain('#1a1a1a');
        expect(fgValue.textContent).toContain('rgb(26, 26, 26)');
        expect(fgRatioValue.textContent).toContain('#1a1a1a');
        expect(fgRatioValue.textContent).toContain('rgb(26, 26, 26)');

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#ff',
                    formattedValue: '#ff',
                },
            })
        );

        await wait(5);

        APCAContrastValue = APCAContrast(parseInt('c7b5fb', 16), parseInt('ffffff', 16));
        legacyContrastValue = legacyContrast([255, 255, 255], [199, 181, 251]);
        expect(fgInput.value).toEqual('#ff');
        expect(fgRatioInput.value).toEqual('#ff');
        expect(fgValue.textContent).toContain('#ffffff');
        expect(fgValue.textContent).toContain('rgb(255, 255, 255)');
        expect(fgRatioValue.textContent).toContain('#ffffff');
        expect(fgRatioValue.textContent).toContain('rgb(255, 255, 255)');
    });

    it('updates state onHexSwap', () => {
        const { container } = render(<App />);

        const fgInput = container.querySelector<HTMLProteanInputElement>('.apca-demo .foreground-input')!;
        const fgRatioInput = container.querySelector<HTMLProteanInputElement>('.ratio-demo .foreground-input')!;

        expect(fgInput.value).toEqual('#1a1a1a');
        expect(fgRatioInput.value).toEqual('#1a1a1a');

        const ratioRGBRadio = container.querySelector<HTMLInputElement>(
            '.ratio-demo input[type="radio"][value="rgb"]'
        )!;

        fireEvent(ratioRGBRadio, new MouseEvent('click', { bubbles: true }));

        expect(fgInput.value).toEqual('rgb(26, 26, 26)');
        expect(fgRatioInput.value).toEqual('rgb(26, 26, 26)');
    });
});
