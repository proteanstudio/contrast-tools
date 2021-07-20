import { Component } from 'react';
import APCAContrast from '../../utils/apca';
import ProteanInput from '../ProteanInput';
import LookupTableCell from '../LookupTableCell';
import { lookupTableItems } from './static';
import './styles.scss';

interface APCADemoState {
    foregroundColor: string;
    backgroundColor: string;
}

export default class APCADemo extends Component<{}, APCADemoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            foregroundColor: '#dcdcdc',
            backgroundColor: '#8f0081',
        };
    }

    lookupTable = lookupTableItems;

    get contrastValue(): number {
        return APCAContrast(this.cleanBackground, this.cleanForeground);
    }

    get cleanForeground(): number {
        return parseInt(this.state.foregroundColor.substring(1), 16);
    }

    get cleanBackground(): number {
        return parseInt(this.state.backgroundColor.substring(1), 16);
    }

    get rgbForeground(): string {
        return this.hexToRGB(this.state.foregroundColor);
    }

    get rgbBackground(): string {
        return this.hexToRGB(this.state.backgroundColor);
    }

    hexToRGB(hex: string): string {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    onForegroundInput = (event: CustomEvent) => {
        this.setState({ foregroundColor: event.detail.value });
    };

    onBackgroundInput = (event: CustomEvent) => {
        this.setState({ backgroundColor: event.detail.value });
    };

    validateColor(color: string): string[] | undefined {
        const isHex = color[0] === '#';
        /* /rgb\(\d{1,3}\,\d{1,3}\,\d{1,3}\)/g */
        return undefined;
    }

    swapColors = (): void => {
        this.setState((state) => {
            return {
                foregroundColor: state.backgroundColor,
                backgroundColor: state.foregroundColor,
            };
        });
    };

    render() {
        return (
            <div className="apca-demo">
                <ProteanInput label="Text color" value={this.state.foregroundColor} oninput={this.onForegroundInput} />
                <ProteanInput
                    label="Background color"
                    value={this.state.backgroundColor}
                    oninput={this.onBackgroundInput}
                ></ProteanInput>
                <button onClick={this.swapColors}>Swap</button>
                <div>{this.rgbForeground}</div>
                <div>{this.rgbBackground}</div>

                <div>
                    <h2>
                        {this.contrastValue} L<sup>c</sup>
                    </h2>
                </div>
                <h2>APCA Lookup Table</h2>
                <div className="lookup-table-wrapper">
                    <table className="lookup-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan={9} className="lookup-table-weight-header">
                                    {' '}
                                    Font weight →{' '}
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
                            {this.lookupTable.map((row, rowIndex) => (
                                <tr key={`lookup-table-row-${rowIndex}`}>
                                    {row.map((cell, index) => {
                                        const tag = index === 0 ? 'th' : 'td';
                                        return (
                                            <LookupTableCell
                                                tag={tag}
                                                value={cell.value}
                                                decorator={cell.decorator}
                                                comparisonValue={this.contrastValue}
                                                key={`lookup-table-cell-${rowIndex}-${index}`}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="lookup-table-key">
                        <h3>Table Color Codes</h3>
                        <ul className="lookup-table-key-list">
                            <li>
                                <LookupTableCell value="N" rating={4} tag="div" />
                                <div>Rating 4</div>
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
                                <div>Rating 4</div>
                            </li>
                            <li>
                                <LookupTableCell value="©" decorator="copyright" tag="div" />
                                <div>Rating 4</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
