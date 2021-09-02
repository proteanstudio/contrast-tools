import { Component } from 'react';

class ProteanTabPane extends Component<IProteanTabPane> {
    render() {
        return (
            <protean-tab-pane label={this.props.label} value={this.props.value} name={this.props.name}>
                {this.props.children}
            </protean-tab-pane>
        );
    }
}

export default ProteanTabPane;
