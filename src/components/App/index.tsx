import { Component } from 'react';
import './styles.scss';
import APCADemo from '../APCADemo';
import RatioDemo from '../RatioDemo';
import ProteanTabPane from '../ProteanTabPane';
import ProteanCheckbox from '../ProteanCheckbox';
import ProteanTabContainer from '../ProteanTabContainer';
import legacyContrast from '../../utils/legacy-ratio';
import { APCAcontrast, sRGBtoY } from 'apca-w3';
import { cleanHex } from '../../utils/colors';

interface AppState {
    activeTab: string;
    darkModeEnabled: boolean;
    foregroundColor: IColorData;
    backgroundColor: IColorData;
    APCAContrastValue: number;
    legacyContrastRatio: number;
    isHex: boolean;
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
        if (darkModeEnabled) {
            document.documentElement.classList.remove('light');
        }

        const params = new URLSearchParams(location.search);

        let foregroundColor = cleanHex('#ffffff').colorData;
        let backgroundColor = cleanHex('#6e45e4').colorData;

        if (params.has('text') && params.has('background')) {
            const textParam = `#${params.get('text')!}`;
            const bgParam = `#${params.get('background')!}`;

            const { isValid: validText, colorData: cleanText } = cleanHex(textParam);
            const { isValid: validBg, colorData: cleanBg } = cleanHex(bgParam);

            if (validText && validBg) {
                foregroundColor = cleanText;
                backgroundColor = cleanBg;
            }
        }

        const activeTab = params.get('tab') ?? 'apca';

        this.state = {
            activeTab,
            darkModeEnabled,
            foregroundColor,
            backgroundColor,
            APCAContrastValue: APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb)),
            legacyContrastRatio: legacyContrast(foregroundColor.rgb, backgroundColor.rgb),
            isHex: true,
        };
    }

    onTabChange = (event: CustomEvent) => {
        if ((event.target as HTMLElement).localName !== 'protean-tab-container') return;

        const activeTab = event.detail.value;

        const params = new URLSearchParams(location.search);
        params.set('tab', activeTab);

        history.replaceState(null, '', `${location.origin}?${params.toString()}`);

        this.setState({ activeTab });
    };

    onLightModeToggle = (event: CustomEvent) => {
        const darkModeEnabled = event.detail.checked;
        localStorage.setItem('darkModeEnabled', darkModeEnabled);
        this.setState({ darkModeEnabled });
        document.documentElement.classList.toggle('light');
    };

    onColorChange = (foregroundColor: IColorData, backgroundColor: IColorData) => {
        const APCAContrastValue = APCAcontrast(sRGBtoY(foregroundColor.rgb), sRGBtoY(backgroundColor.rgb));
        const legacyContrastRatio = legacyContrast(foregroundColor.rgb, backgroundColor.rgb);

        this.setState({
            foregroundColor,
            backgroundColor,
            APCAContrastValue,
            legacyContrastRatio,
        });
    };

    onHexSwap = (isHex: boolean) => {
        this.setState(({ foregroundColor, backgroundColor }) => {
            return {
                isHex,
                foregroundColor: {
                    ...foregroundColor,
                    activeColor: isHex ? foregroundColor.hexString : foregroundColor.rgbString,
                },
                backgroundColor: {
                    ...backgroundColor,
                    activeColor: isHex ? backgroundColor.hexString : backgroundColor.rgbString,
                },
            };
        });
    };

    render() {
        return (
            <div className="app content">
                <div className="header-content">
                    <h1>
                        Contrast <span className="hidden-s">tools</span>
                    </h1>
                    <ProteanCheckbox
                        className="dark-mode-toggle"
                        label="Dark mode"
                        variant="toggle"
                        alignment="right"
                        checked={this.state.darkModeEnabled}
                        onchange={this.onLightModeToggle}
                    />
                </div>
                <ProteanTabContainer value={this.state.activeTab} onchange={this.onTabChange}>
                    <ProteanTabPane value="apca" label="APCA">
                        <APCADemo
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            contrastValue={this.state.APCAContrastValue}
                            isHex={this.state.isHex}
                            onColorChange={this.onColorChange}
                            onHexSwap={this.onHexSwap}
                        />
                    </ProteanTabPane>
                    <ProteanTabPane value="wcag-21" label="WCAG 2.1">
                        <RatioDemo
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            contrastValue={this.state.legacyContrastRatio}
                            isHex={this.state.isHex}
                            onColorChange={this.onColorChange}
                            onHexSwap={this.onHexSwap}
                        />
                    </ProteanTabPane>
                </ProteanTabContainer>
            </div>
        );
    }
}
