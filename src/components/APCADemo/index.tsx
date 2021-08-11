import { Component } from 'react';
import APCAContrast from '../../utils/apca-contrast/';
import APCARating from '../../utils/apca-rating/';
import LookupTableCell from '../LookupTableCell';
import { lookupTableItems } from './static';
import './styles.scss';
import SampleText from '../SampleText';
import ContrastChecker from '../ContrastChecker';

interface APCADemoState {
    foregroundColor: string;
    backgroundColor: string;
    contrastValue: number;
}

export default class APCADemo extends Component<{}, APCADemoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            foregroundColor: '#1a1a1a',
            backgroundColor: '#c7b5fb',
            contrastValue: APCAContrast(parseInt('c7b5fb', 16), parseInt('1a1a1a', 16)),
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
            <div className="apca-demo">
                <ContrastChecker
                    isAPCA={true}
                    foregroundColor={this.state.foregroundColor}
                    backgroundColor={this.state.backgroundColor}
                    contrastValue={this.state.contrastValue}
                    onColorChange={this.onColorChange}
                />
                <section>
                    <h2>APCA Lookup Table</h2>
                    <div className="lookup-table-wrapper">
                        <table className="lookup-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th colSpan={9} className="lookup-table-weight-header">
                                        <strong>Font weight →</strong>
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
                                                    comparisonValue={this.state.contrastValue}
                                                    key={`lookup-table-cell-${rowIndex}-${index}`}
                                                />
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <section className="lookup-table-key">
                            <h3>Table key</h3>
                            <ul className="lookup-table-key-list">
                                <li>
                                    <LookupTableCell value="N" rating={4} tag="div" />
                                    <div>WCAG 3.0 Rating 4</div>
                                </li>
                                <li>
                                    <LookupTableCell value="N" rating={3} tag="div" />
                                    <div>Rating 3</div>
                                </li>
                                <li>
                                    <LookupTableCell value="N" rating={2} tag="div" />
                                    <div>Rating 2</div>
                                </li>
                                <li>
                                    <LookupTableCell value="N" rating={1} tag="div" />
                                    <div>Rating 1</div>
                                </li>
                                <li>
                                    <LookupTableCell value="N" rating={0} tag="div" />
                                    <div>Rating 0</div>
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
                <section>
                    <h2>Example font combinations & ratings</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis esse omnis repellendus rem
                        suscipit ipsa, error animi qui odio, veniam sed adipisci officiis provident est quos atque,
                        corporis debitis magnam?
                    </p>
                    <div className="sample-container">
                        <SampleText
                            fontSize="14px"
                            fontWeight={400}
                            text="14px/400"
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            rating={APCARating(this.state.contrastValue, 100)}
                        />
                        <SampleText
                            fontSize="16px"
                            fontWeight={400}
                            text="16px/400"
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            rating={APCARating(this.state.contrastValue, 90)}
                        />
                        <SampleText
                            fontSize="16px"
                            fontWeight={600}
                            text="16px/600"
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            rating={APCARating(this.state.contrastValue, 60)}
                        />
                        <SampleText
                            fontSize="24px"
                            fontWeight={500}
                            text="24px/500"
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            rating={APCARating(this.state.contrastValue, 55)}
                        />
                        <SampleText
                            fontSize="30px"
                            fontWeight={300}
                            text="30px/300"
                            foregroundColor={this.state.foregroundColor}
                            backgroundColor={this.state.backgroundColor}
                            rating={APCARating(this.state.contrastValue, 70)}
                        />
                    </div>
                </section>
            </div>
        );
    }
}
