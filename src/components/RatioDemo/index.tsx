import { Component } from 'react';
import legacyContrast from '../../utils/legacy-ratio';
import ContrastChecker from '../ContrastChecker';
import './styles.scss';

interface RatioDemoState {
    foregroundColor: string;
    backgroundColor: string;
    contrastValue: number;
}

type RatioGradeText = 'pass' | 'fail';

export default class RatioDemo extends Component<{}, RatioDemoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: legacyContrast([199, 181, 251], [26, 26, 26]),
        };
    }

    getGradeText(threshold: number): RatioGradeText {
        return this.state.contrastValue < threshold ? 'fail' : 'pass';
    }

    onColorChange = (foregroundColor: number, backgroundColor: number, contrastValue: number) => {
        this.setState({
            foregroundColor: `#${foregroundColor.toString(16).padStart(6, '0')}`,
            backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`,
            contrastValue,
        });
    };

    render() {
        const grade3 = this.getGradeText(3);
        const grade45 = this.getGradeText(4.5);
        const grade7 = this.getGradeText(7);

        return (
            <div className="ratio-demo">
                <section>
                    <ContrastChecker
                        foregroundColor={this.state.foregroundColor}
                        backgroundColor={this.state.backgroundColor}
                        contrastValue={this.state.contrastValue}
                        isAPCA={false}
                        onColorChange={this.onColorChange}
                    />
                </section>
                <section>
                    <h2>Normal text</h2>
                    <dl className="ratio-grades">
                        <dt>WCAG 2.1 AA</dt>
                        <dd className="normal-aa-grade">
                            <span className={grade45}>{grade45}</span>
                        </dd>
                        <dt>WCAG 2.1 AAA</dt>
                        <dd className="normal-aaa-grade">
                            <span className={grade7}>{grade7}</span>
                        </dd>
                    </dl>
                </section>
                <section>
                    <h2>Large text</h2>
                    <p>
                        Text that is 14pt (18.67px) and bold or any text bigger than 18pt (24px) is defined as large
                        scale text.
                    </p>
                    <dl className="ratio-grades">
                        <dt>WCAG 2.1 AA</dt>
                        <dd className="large-aa-grade">
                            <span className={grade3}>{grade3}</span>
                        </dd>
                        <dt>WCAG 2.1 AAA</dt>
                        <dd className="large-aaa-grade">
                            <span className={grade45}>{grade45}</span>
                        </dd>
                    </dl>
                </section>
            </div>
        );
    }
}
