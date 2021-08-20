import { Component } from 'react';
import ContrastChecker from '../ContrastChecker';
import './styles.scss';

export interface RatioDemoProps {
    foregroundColor: IColorData;
    backgroundColor: IColorData;
    contrastValue: number;
    isHex: boolean;
    onColorChange: (foregroundColor: IColorData, backgroundColor: IColorData) => void;
    onHexSwap: (isHex: boolean) => void;
}

type RatioGradeText = 'pass' | 'fail';

export default class RatioDemo extends Component<RatioDemoProps> {
    getGradeText(threshold: number): RatioGradeText {
        return this.props.contrastValue < threshold ? 'fail' : 'pass';
    }

    render() {
        const grade3 = this.getGradeText(3);
        const grade45 = this.getGradeText(4.5);
        const grade7 = this.getGradeText(7);

        return (
            <div className="ratio-demo">
                <section>
                    <ContrastChecker
                        foregroundColor={this.props.foregroundColor}
                        backgroundColor={this.props.backgroundColor}
                        contrastValue={this.props.contrastValue}
                        isAPCA={false}
                        isHex={this.props.isHex}
                        onColorChange={this.props.onColorChange}
                        onHexSwap={this.props.onHexSwap}
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
