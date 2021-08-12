import { Component } from 'react';
import './styles.scss';
import APCADemo from '../APCADemo';
import RatioDemo from '../RatioDemo';
import ProteanTabPane from '../ProteanTabPane';
import ProteanCheckbox from '../ProteanCheckbox';
import ProteanTabContainer from '../ProteanTabContainer';

interface AppState {
    activeTab: string;
    darkModeEnabled: boolean;
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
        if (darkModeEnabled) {
            document.documentElement.classList.remove('light');
        }

        this.state = { activeTab: 'wcag-30', darkModeEnabled };
    }

    onTabChange = (event: CustomEvent) => {
        this.setState({ activeTab: event.detail.value });
    };

    onLightModeToggle = (event: CustomEvent) => {
        const darkModeEnabled = event.detail.checked;
        localStorage.setItem('darkModeEnabled', darkModeEnabled);
        this.setState({ darkModeEnabled });
        document.documentElement.classList.toggle('light');
    };

    render() {
        return (
            <div className="app content">
                <div className="header-content">
                    <h1>
                        Contrast <span className="hidden-s">checker</span>
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
                        <APCADemo />
                    </ProteanTabPane>
                    <protean-tab-pane value="wcag-21" label="WCAG 2.1">
                        <RatioDemo />
                    </protean-tab-pane>
                </ProteanTabContainer>
            </div>
        );
    }
}
