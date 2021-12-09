import { Component, ChangeEvent } from 'react';
import ProteanInput from '../ProteanInput';
import RadioButton from '../RadioButton';
import SampleText from '../SampleText';
import debounce from '../../utils/debounce/';
import createGuid from '../../utils/guid';
import './styles.scss';

export interface ContrastCheckerProps {
    foregroundColor: IColorData;
    backgroundColor: IColorData;
    contrastValue: number;
    isHex: boolean;
    isAPCA: boolean;
    onColorChange: (foregroundColor: IColorData, backgroundColor: IColorData) => void;
    onHexSwap: (isHex: boolean) => void;
}

interface ContrastCheckerState {
    foregroundErrors?: string[];
    backgroundErrors?: string[];
}

interface CleanColor {
    hexString: string;
    rgbString: string;
    hexNumber: number;
    rgb: number[];
    isValid: boolean;
}

export default class ContrastChecker extends Component<ContrastCheckerProps, ContrastCheckerState> {
    constructor(props: ContrastCheckerProps) {
        super(props);

        this.state = {};
    }

    radioName: string = `color-type-${createGuid()}`;

    get inputFormat(): 'hex' | 'rgb' {
        return this.props.isHex ? 'hex' : 'rgb';
    }

    getRGBString = (rgb: number[]): string => {
        const [r, g, b] = rgb;
        return `rgb(${r}, ${g}, ${b})`;
    };

    hexToRGB(hex: string): string {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    swapColors = (): void => {
        const fg = { ...this.props.backgroundColor };
        const bg = { ...this.props.foregroundColor };

        this.props.onColorChange(fg, bg);
    };

    cleanHex = (color: string, type: 'foreground' | 'background'): CleanColor => {
        let workingColor = color.substring(1);
        let colorObj: {
            r: string;
            g: string;
            b: string;
            [key: string]: string;
        };

        switch (workingColor.length) {
            case 1:
                colorObj = {
                    r: workingColor + workingColor,
                    g: workingColor + workingColor,
                    b: workingColor + workingColor,
                };
                break;
            case 2:
                colorObj = {
                    r: workingColor,
                    g: workingColor,
                    b: workingColor,
                };
                break;
            case 3:
                colorObj = {
                    r: workingColor.substr(0, 1) + workingColor.substr(0, 1),
                    g: workingColor.substr(1, 1) + workingColor.substr(1, 1),
                    b: workingColor.substr(2, 1) + workingColor.substr(2, 1),
                };
                break;
            case 6:
                colorObj = {
                    r: workingColor.substr(0, 2),
                    g: workingColor.substr(2, 2),
                    b: workingColor.substr(4, 2),
                };
                break;
            default:
                this.setError(type);
                return {
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                    isValid: false,
                };
        }

        for (const colorVal in colorObj!) {
            if (!/^[0-9A-F]{2}$/i.test(colorObj[colorVal])) {
                this.setError(type);
                return {
                    hexString: '',
                    rgbString: '',
                    hexNumber: 0,
                    rgb: [],
                    isValid: false,
                };
            }
        }

        this.clearError(type);
        const { r, g, b }: IDict<number | string> = colorObj;
        workingColor = r + g + b;

        const rgb = [r, g, b].map((num) => parseInt(num, 16));

        return {
            hexString: `#${workingColor}`,
            rgbString: this.getRGBString(rgb),
            hexNumber: parseInt(workingColor, 16),
            rgb: Object.values(colorObj).map((num) => parseInt(num, 16)),
            isValid: true,
        };
    };

    cleanRGB = (color: string, type: 'foreground' | 'background'): CleanColor => {
        const regex = /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g;

        if (!regex.test(color)) {
            this.setError(type);
            return {
                hexString: '',
                rgbString: '',
                hexNumber: 0,
                rgb: [],
                isValid: false,
            };
        }

        const { workingColor, isValid, rgb } = color
            .match(/\d{1,3}/g)
            ?.reduce<{ workingColor: string; isValid: boolean; rgb: number[] }>(
                (acc, item) => {
                    let num = Number(item);
                    if (num > 255) {
                        this.setError(type);
                        acc.isValid = false;
                    }

                    acc.workingColor += num.toString(16).padStart(2, '0');
                    acc.rgb.push(num);

                    return acc;
                },
                { workingColor: '', isValid: true, rgb: [] }
            )!;

        if (isValid) {
            this.clearError(type);
        }

        return {
            hexString: `#${workingColor}`,
            rgbString: this.getRGBString(rgb),
            hexNumber: parseInt(workingColor!, 16),
            rgb,
            isValid,
        };
    };

    setError = (type: 'foreground' | 'background'): void => {
        const formatStr = this.props.isHex ? 'hex' : 'rgb';
        const msg = [`Please enter a valid ${formatStr} color code`];

        if (type === 'foreground') {
            this.setState({ foregroundErrors: msg });
            return;
        }

        this.setState({ backgroundErrors: msg });
    };

    clearError = (type: 'foreground' | 'background'): void => {
        if (type === 'foreground' && !!this.state.foregroundErrors) {
            this.setState({ foregroundErrors: undefined });
            return;
        }

        !!this.state.backgroundErrors && this.setState({ backgroundErrors: undefined });
    };

    onForegroundInput = (event: CustomEvent) => {
        let color = event.detail.formattedValue;
        const isColorInput = (event.target as HTMLInputElement).type === 'color';

        if (isColorInput && !this.props.isHex) {
            color = this.hexToRGB(color);
        }

        this.debouncedColorInputHandler(color, 'foreground');
    };

    onBackgroundInput = (event: CustomEvent) => {
        let color = event.detail.formattedValue;
        const isColorInput = (event.target as HTMLInputElement).type === 'color';

        if (isColorInput && !this.props.isHex) {
            color = this.hexToRGB(color);
        }

        this.debouncedColorInputHandler(color, 'background');
    };

    onColorInput = (color: string, type: 'foreground' | 'background') => {
        let fg = { ...this.props.foregroundColor };
        let bg = { ...this.props.backgroundColor };
        let cleanColorObj: CleanColor;

        if (this.props.isHex) {
            cleanColorObj = this.cleanHex(color, type);
        } else {
            cleanColorObj = this.cleanRGB(color, type);
        }

        let { isValid, ...filteredCleanColorObj } = cleanColorObj;
        if (type === 'foreground') {
            fg = {
                ...filteredCleanColorObj,
                activeColor: color,
            };
        } else {
            bg = {
                ...filteredCleanColorObj,
                activeColor: color,
            };
        }

        if (isValid) {
            this.props.onColorChange(fg, bg);
        }
    };

    debouncedColorInputHandler = debounce(this.onColorInput.bind(this), 5);

    onHexSwap = (event: ChangeEvent) => {
        const isHex = (event.target as HTMLInputElement).value === 'hex';

        this.props.onHexSwap(isHex);
    };

    render() {
        return (
            <section className="contrast-checker">
                <div className="field-container">
                    <div className="flex">
                        <ProteanInput
                            label="Text color"
                            type="color-code"
                            className="foreground-input"
                            format={this.inputFormat}
                            value={this.props.foregroundColor.activeColor}
                            errors={this.state.foregroundErrors}
                            oninput={this.onForegroundInput}
                        />
                        <ProteanInput
                            a11yLabel="Text color"
                            className="foreground-color-input"
                            value={this.props.foregroundColor.hexString}
                            type="color"
                            oninput={this.onForegroundInput}
                        />
                    </div>
                    <div className="color-values">
                        <div>{this.props.foregroundColor.hexString}</div>
                        <div>|</div>
                        <div>{this.props.foregroundColor.rgbString}</div>
                    </div>
                </div>
                <div className="contrast-value">
                    <div>Contrast value</div>
                    <h2>
                        {this.props.isAPCA ? (
                            <span>
                                {this.props.contrastValue} L<sup>c</sup>
                            </span>
                        ) : (
                            <span>{this.props.contrastValue.toFixed(2)}:1</span>
                        )}
                    </h2>
                    <protean-button variant="icon" onClick={this.swapColors} a11y-label="Swap colors">
                        <protean-icon type="swap"></protean-icon>
                    </protean-button>
                </div>
                <div className="field-container">
                    <div className="flex">
                        <ProteanInput
                            label="Background color"
                            value={this.props.backgroundColor.activeColor}
                            className="background-input"
                            type="color-code"
                            format={this.inputFormat}
                            errors={this.state.backgroundErrors}
                            oninput={this.onBackgroundInput}
                        />
                        <ProteanInput
                            a11yLabel="Background color"
                            className="background-color-input"
                            value={this.props.backgroundColor.hexString}
                            type="color"
                            oninput={this.onBackgroundInput}
                        />
                    </div>
                    <div className="color-values">
                        <div>{this.props.backgroundColor.hexString}</div>
                        <div>|</div>
                        <div>{this.props.backgroundColor.rgbString}</div>
                    </div>
                </div>
                <div className="radio-list">
                    <RadioButton
                        value="rgb"
                        label="Use RGB"
                        name={this.radioName}
                        checked={!this.props.isHex}
                        handleChange={this.onHexSwap}
                    />
                    <RadioButton
                        value="hex"
                        label="Use Hex"
                        name={this.radioName}
                        checked={this.props.isHex}
                        handleChange={this.onHexSwap}
                    />
                </div>
                <div className="sample-container">
                    <SampleText
                        fontSize="16px"
                        fontWeight={600}
                        text="Sample text"
                        foregroundColor={this.props.foregroundColor.hexString}
                        backgroundColor={this.props.backgroundColor.hexString}
                    />
                </div>
            </section>
        );
    }
}
