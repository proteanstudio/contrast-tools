import { Component } from 'react';
import APCARating from '../../utils/apca-rating/';
import LookupTableCell from '../LookupTableCell';
import { lookupTableItems } from './static';
import './styles.scss';
import SampleText from '../SampleText';
import ContrastChecker from '../ContrastChecker';

export interface APCADemoProps {
    foregroundColor: IColorData;
    backgroundColor: IColorData;
    contrastValue: number;
    isHex: boolean;
    onColorChange: (foregroundColor: IColorData, backgroundColor: IColorData) => void;
    onHexSwap: (isHex: boolean) => void;
}

export default class APCADemo extends Component<APCADemoProps> {
    render() {
        return (
            <div className="apca-demo">
                <ContrastChecker
                    isAPCA={true}
                    foregroundColor={this.props.foregroundColor}
                    backgroundColor={this.props.backgroundColor}
                    contrastValue={this.props.contrastValue}
                    isHex={this.props.isHex}
                    onColorChange={this.props.onColorChange}
                    onHexSwap={this.props.onHexSwap}
                />
                <section>
                    <h2>Color contrast in WCAG 3.0</h2>
                    <p>
                        Color contrast value in WCAG 3.0 is calculated using the{' '}
                        <a href="https://www.myndex.com/APCA/" rel="noreferrer" target="_blank">
                            Advanced Perception of Color Algorithm (APCA)
                        </a>
                        . Unlike previous contrast calculations, the APCA considers the context in which colors are used
                        to determine their readability. The font size, font weight, and sequence of background and text
                        colors all impact the final WCAG rating.
                    </p>
                    <p>
                        WCAG 3.0 ratings for text contrast are based on the proximity of a calculated contrast value (L
                        <sup>c</sup>) to its target score on the APCA Lookup Table below.
                    </p>
                    <section>
                        <h3>APCA Lookup Table</h3>
                        <div className="lookup-table-wrapper">
                            <table className="lookup-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th colSpan={9} className="lookup-table-weight-header">
                                            <strong>Font weight</strong>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th aria-label="Font size"></th>
                                        <th aria-label="Font weight 100">100</th>
                                        <th aria-label="Font weight 200">200</th>
                                        <th aria-label="Font weight 300">300</th>
                                        <th aria-label="Font weight 400">400</th>
                                        <th aria-label="Font weight 500">500</th>
                                        <th aria-label="Font weight 600">600</th>
                                        <th aria-label="Font weight 700">700</th>
                                        <th aria-label="Font weight 800">800</th>
                                        <th aria-label="Font weight 900">900</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lookupTableItems.map((row, rowIndex) => (
                                        <tr key={`lookup-table-row-${rowIndex}`}>
                                            {row.map((cell, index) => {
                                                const tag = index === 0 ? 'th' : 'td';
                                                return (
                                                    <LookupTableCell
                                                        tag={tag}
                                                        value={cell.value}
                                                        decorator={cell.decorator}
                                                        comparisonValue={this.props.contrastValue}
                                                        key={`lookup-table-cell-${rowIndex}-${index}`}
                                                    />
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <section className="lookup-table-key">
                                <h4>Table key</h4>
                                <ul className="lookup-table-key-list">
                                    <li>
                                        <LookupTableCell value="N" rating={4} tag="div" comparisonValue={0} />
                                        <div>
                                            WCAG 3.0 Rating 4 - meets or exceeds the values on the APCA Lookup table
                                        </div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="N" rating={3} tag="div" comparisonValue={0} />
                                        <div>Rating 3 - 1-4% below</div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="N" rating={2} tag="div" comparisonValue={0} />
                                        <div>Rating 2 - 5-9% below</div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="N" rating={1} tag="div" comparisonValue={0} />
                                        <div>Rating 1 - 10-15% below</div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="N" rating={0} tag="div" comparisonValue={0} />
                                        <div>Rating 0 - &gt;15% below</div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="N" tag="div" decorator="caution" />
                                        <div>Not recommended for blocks of text</div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="X" decorator="prohibited" tag="div" />
                                        <div>Prohibited except for decorative purposes</div>
                                    </li>
                                    <li>
                                        <LookupTableCell value="©" decorator="copyright" tag="div" />
                                        <div>Use for copyright/by-line only</div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </section>
                </section>
                <section>
                    <h2>Example font combinations & ratings</h2>
                    <div className="sample-container">
                        <SampleText
                            fontSize="14px"
                            fontWeight={400}
                            text="14px/400"
                            foregroundColor={this.props.foregroundColor.hexString}
                            backgroundColor={this.props.backgroundColor.hexString}
                            rating={APCARating(this.props.contrastValue, 100)}
                        />
                        <SampleText
                            fontSize="16px"
                            fontWeight={400}
                            text="16px/400"
                            foregroundColor={this.props.foregroundColor.hexString}
                            backgroundColor={this.props.backgroundColor.hexString}
                            rating={APCARating(this.props.contrastValue, 90)}
                        />
                        <SampleText
                            fontSize="16px"
                            fontWeight={600}
                            text="16px/600"
                            foregroundColor={this.props.foregroundColor.hexString}
                            backgroundColor={this.props.backgroundColor.hexString}
                            rating={APCARating(this.props.contrastValue, 60)}
                        />
                        <SampleText
                            fontSize="24px"
                            fontWeight={500}
                            text="24px/500"
                            foregroundColor={this.props.foregroundColor.hexString}
                            backgroundColor={this.props.backgroundColor.hexString}
                            rating={APCARating(this.props.contrastValue, 55)}
                        />
                        <SampleText
                            fontSize="30px"
                            fontWeight={300}
                            text="30px/300"
                            foregroundColor={this.props.foregroundColor.hexString}
                            backgroundColor={this.props.backgroundColor.hexString}
                            rating={APCARating(this.props.contrastValue, 70)}
                        />
                    </div>
                </section>
                <hr />
                <section>
                    <h2>Attributions</h2>
                    <p>
                        SAPC & APCA were invented / developed by Andrew Somers, Senior Color Science Researcher at
                        Myndex Technologies as part of the ongoing PerceptEx™ Perception Research Project.
                    </p>

                    <p>SAPC: S-LUV Advanced Perceptual Color — an appearance model for self-illuminated displays</p>

                    <p>
                        APCA: Advanced Perceptual Contrast Algorithm — a method for determining contrast to guide
                        web-based design.
                    </p>

                    <p>
                        APCA is derived from the SAPC model. APCA is a method for prediction pf suprathreshold visual
                        contrast of text on displays. APCA results are intended to provide design guidance for best
                        readability of web-based content.
                    </p>
                    <section>
                        <h3>APCA DISCLAIMER</h3>

                        <p>
                            APCA is intended solely for web-based content per the W3 WCAG 3.0 standards, and the
                            web-content version is licensed to the W3 per their cooperative agreement. Use for
                            other-than web-based-content is restricted and/or prohibited. APCA is a public beta, under
                            active development. Prior written authorization is required for the use of SAPC or APCA in
                            the context of, or in applications for, transportation, aerospace, medical, military, or
                            where human safety is involved.
                        </p>
                    </section>
                </section>
            </div>
        );
    }
}
