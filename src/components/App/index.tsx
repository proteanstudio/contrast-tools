import { Component } from 'react';
import './styles.scss';
import APCADemo from '../APCADemo';
import RatioDemo from '../RatioDemo';
import ProteanTabPane from '../ProteanTabPane';
import ProteanCheckbox from '../ProteanCheckbox';

interface AppState {
    activeTab: string;
    darkModeEnabled: boolean;
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { activeTab: 'wcag-30', darkModeEnabled: false };
    }

    onTabChange = (event: CustomEvent) => {
        this.setState({ activeTab: event.detail.value });
    };

    onLightModeToggle = (event: CustomEvent) => {
        this.setState({ darkModeEnabled: event.detail.checked });
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
                        label="Dark mode"
                        variant="toggle"
                        alignment="right"
                        checked={this.state.darkModeEnabled}
                        onchange={this.onLightModeToggle}
                    />
                </div>
                <protean-tab-container value={this.state.activeTab}>
                    <ProteanTabPane value="wcag-30" label="WCAG 3.0">
                        <APCADemo />
                    </ProteanTabPane>
                    <protean-tab-pane value="wcag-21" label="WCAG 2.1">
                        <RatioDemo />
                    </protean-tab-pane>
                </protean-tab-container>
            </div>
        );
    }
}
