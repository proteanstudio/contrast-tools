import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '.';
import legacyContrast from '../../utils/legacy-ratio';
import { APCAcontrast, sRGBtoY } from 'apca-w3';

describe('App', () => {
    it('renders default state', () => {
        const { container } = render(<App />);

        const component = container.children[0];
        expect(component).toHaveClass('app', 'content');

        expect(container.querySelector('h1')?.textContent?.trim()).toEqual('Contrast tools');

        const tabContainer = container.querySelector('protean-tab-container');
        expect(tabContainer?.value).toEqual('apca');

        const darkModeToggle = container.querySelector<HTMLProteanCheckboxElement>('.dark-mode-toggle');
        expect(darkModeToggle?.checked).toEqual(false);
        expect(localStorage.getItem('darkModeEnabled')).toEqual(null);

        const APCAContrastValue = APCAcontrast(sRGBtoY([255, 255, 255]), sRGBtoY([110, 69, 228]));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(2));

        const legacyContrastValue = legacyContrast([255, 255, 255], [110, 69, 228]);

        const legacyContrastValueElem = container.querySelector<HTMLDivElement>('.ratio-demo .contrast-value')!;

        expect(legacyContrastValueElem.textContent).toContain(legacyContrastValue.toFixed(2));
    });

    it('inits from query params', () => {
        const origLocation = global.location;
        delete (global as any).location;
        global.location = {
            search: '?text=000000&background=ffffff',
        } as Location;

        const { container } = render(<App />);

        const APCAContrastValue = APCAcontrast(sRGBtoY([0, 0, 0]), sRGBtoY([255, 255, 255]));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(2));

        global.location = origLocation;
    });

    it('falls back to default from invalid query params', () => {
        const origLocation = global.location;
        delete (global as any).location;
        global.location = {
            search: '?text=foobar&background=ffffff',
        } as Location;

        const { container } = render(<App />);

        const APCAContrastValue = APCAcontrast(sRGBtoY([255, 255, 255]), sRGBtoY([110, 69, 228]));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(2));

        global.location = origLocation;
    });

    it('falls back to default with missing query params', () => {
        const origLocation = global.location;
        delete (global as any).location;
        global.location = {
            search: '?text=background=ffffff',
        } as Location;

        const { container } = render(<App />);

        const APCAContrastValue = APCAcontrast(sRGBtoY([255, 255, 255]), sRGBtoY([110, 69, 228]));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(2));

        global.location = origLocation;
    });

    it('changes tabs', () => {
        const { container } = render(<App />);

        const tabContainer = container.querySelector('protean-tab-container')!;
        expect(tabContainer.value).toEqual('apca');

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

        let APCAContrastValue = APCAcontrast(sRGBtoY([255, 255, 255]), sRGBtoY([110, 69, 228]));
        const APCAContrastValueElem = container.querySelector<HTMLDivElement>('.apca-demo .contrast-value')!;

        expect(APCAContrastValueElem.textContent).toContain(APCAContrastValue.toFixed(2));

        let legacyContrastValue = legacyContrast([255, 255, 255], [110, 69, 228]);

        const legacyContrastValueElem = container.querySelector<HTMLDivElement>('.ratio-demo .contrast-value')!;

        expect(legacyContrastValueElem.textContent).toContain(legacyContrastValue.toFixed(2));

        const fgInput = container.querySelector('.apca-demo .foreground-input')! as unknown as HTMLProteanInputElement;
        const fgRatioInput = container.querySelector(
            '.ratio-demo .foreground-input'
        )! as unknown as HTMLProteanInputElement;

        expect(fgInput.value).toEqual('#ffffff');
        expect(fgRatioInput.value).toEqual('#ffffff');

        const fgValue = container.querySelector<HTMLDivElement>('.apca-demo .color-values')!;
        const fgRatioValue = container.querySelector<HTMLDivElement>('.ratio-demo .color-values')!;

        expect(fgValue.textContent).toContain('#ffffff');
        expect(fgValue.textContent).toContain('rgb(255, 255, 255)');
        expect(fgRatioValue.textContent).toContain('#ffffff');
        expect(fgRatioValue.textContent).toContain('rgb(255, 255, 255)');

        fireEvent(
            fgInput,
            new CustomEvent('input', {
                detail: {
                    value: '#00',
                    formattedValue: '#00',
                },
            })
        );

        await waitFor(() => expect(fgInput.value).toEqual('#00'));
        expect(fgRatioInput.value).toEqual('#00');
        expect(fgValue.textContent).toContain('#000000');
        expect(fgValue.textContent).toContain('rgb(0, 0, 0)');
        expect(fgRatioValue.textContent).toContain('#000000');
        expect(fgRatioValue.textContent).toContain('rgb(0, 0, 0)');
    });

    it('updates state onHexSwap', () => {
        const { container } = render(<App />);

        const fgInput = container.querySelector('.apca-demo .foreground-input')! as unknown as HTMLProteanInputElement;
        const fgRatioInput = container.querySelector(
            '.ratio-demo .foreground-input'
        )! as unknown as HTMLProteanInputElement;

        expect(fgInput.value).toEqual('#ffffff');
        expect(fgRatioInput.value).toEqual('#ffffff');

        const ratioRGBRadio = container.querySelector<HTMLInputElement>(
            '.ratio-demo input[type="radio"][value="rgb"]'
        )!;

        fireEvent(ratioRGBRadio, new MouseEvent('click', { bubbles: true }));

        expect(fgInput.value).toEqual('rgb(255, 255, 255)');
        expect(fgRatioInput.value).toEqual('rgb(255, 255, 255)');

        const ratioHexRadio = container.querySelector<HTMLInputElement>(
            '.ratio-demo input[type="radio"][value="hex"]'
        )!;

        fireEvent(ratioHexRadio, new MouseEvent('click', { bubbles: true }));

        expect(fgInput.value).toEqual('#ffffff');
        expect(fgRatioInput.value).toEqual('#ffffff');
    });
});
