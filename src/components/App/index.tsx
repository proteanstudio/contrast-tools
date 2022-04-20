import { Component } from 'react';
import './styles.scss';
import APCADemo from '../APCADemo';
import RatioDemo from '../RatioDemo';
import ProteanTabPane from '../ProteanTabPane';
import ProteanCheckbox from '../ProteanCheckbox';
import ProteanTabContainer from '../ProteanTabContainer';
import legacyContrast from '../../utils/legacy-ratio';
import { APCAcontrast, sRGBtoY } from 'apca-w3';

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

        const foregroundColor = {
            hexString: '#1a1a1a',
            rgbString: 'rgb(26, 26, 26)',
            activeColor: '#1a1a1a',
            hexNumber: parseInt('1a1a1a', 16),
            rgb: [26, 26, 26],
        };

        const backgroundColor = {
            hexString: '#c7b5fb',
            rgbString: 'rgb(199, 181, 251)',
            activeColor: '#c7b5fb',
            hexNumber: parseInt('c7b5fb', 16),
            rgb: [199, 181, 251],
        };

        this.state = {
            activeTab: 'wcag-30',
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

        this.setState({ activeTab: event.detail.value });
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
                    <ProteanTabPane value="wcag-30" label="WCAG 3.0">
                        <APCADemo
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            contrastValue={this.state.APCAContrastValue}
                            isHex={this.state.isHex}
                            onColorChange={this.onColorChange}
                            onHexSwap={this.onHexSwap}
                        />
                    </ProteanTabPane>
                    <protean-tab-pane value="wcag-21" label="WCAG 2.1">
                        <RatioDemo
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            contrastValue={this.state.legacyContrastRatio}
                            isHex={this.state.isHex}
                            onColorChange={this.onColorChange}
                            onHexSwap={this.onHexSwap}
                        />
                    </protean-tab-pane>
                </ProteanTabContainer>
            </div>
        );
    }
}
