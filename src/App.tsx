import { Component } from 'react';
import './App.scss';
import APCADemo from './components/APCADemo';
// import ProteanTabContainer from './components/ProteanTabContainer';
import ProteanTabPane from './components/ProteanTabPane';

interface AppState {
    activeTab: string;
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { activeTab: 'wcag-30' };
    }

    onTabChange = (event: CustomEvent) => {
        this.setState({ activeTab: event.detail.value });
    };

    render() {
        return (
            <div className="app content">
                <h1>Contrast checker</h1>
                {/* <ProteanTabContainer value={this.state.activeTab} onchange={this.onTabChange}> */}
                <protean-tab-container value={this.state.activeTab}> {/* using web component to avoid focus loss when using keyboard controls */}
                    <ProteanTabPane value="wcag-30" label="WCAG 3.0">
                        <APCADemo />
                    </ProteanTabPane>
                    <protean-tab-pane value="wcag-21" label="WCAG 2.1">
                        WCAG 2.1 Content
                    </protean-tab-pane>
                </protean-tab-container>
                {/* </ProteanTabContainer> */}
            </div>
        );
    }
}
