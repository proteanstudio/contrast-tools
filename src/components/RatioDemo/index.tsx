import { Component } from 'react';
import legacyContrast from '../../utils/legacy-ratio';
import ContrastChecker from '../ContrastChecker';

interface RatioDemoState {
    foregroundColor: string;
    backgroundColor: string;
    contrastValue: number;
}

export default class RatioDemo extends Component<{}, RatioDemoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: legacyContrast([199, 181, 251], [26, 26, 26]),
        };
    }

    onColorChange = (foregroundColor: number, backgroundColor: number, contrastValue: number) => {
        this.setState({
            foregroundColor: `#${foregroundColor.toString(16).padStart(6, '0')}`,
            backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`,
            contrastValue,
        });
    };

    render() {
        return (
            <div className="ratio-demo">
                <ContrastChecker
                    foregroundColor={this.state.foregroundColor}
                    backgroundColor={this.state.backgroundColor}
                    contrastValue={this.state.contrastValue}
                    isAPCA={false}
                    onColorChange={this.onColorChange}
                />
            </div>
        );
    }
}
