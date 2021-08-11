import { Component, ChangeEvent } from 'react';
import ProteanInput from '../ProteanInput';
import RadioButton from '../RadioButton';
import SampleText from '../SampleText';
import debounce from '../../utils/debounce/';
import APCAContrast from '../../utils/apca-contrast/';
import './styles.scss';
import legacyContrast from '../../utils/legacy-ratio';
import { createGuid } from '../../utils/guid';

interface ContrastCheckerProps {
    foregroundColor: string;
    backgroundColor: string;
    contrastValue: number;
    isAPCA: boolean;
    onColorChange: (foregroundColor: number, backgroundColor: number, contrastValue: number) => void;
}

interface ContrastCheckerState {
    isHex: boolean;
    foregroundErrors?: string[];
    backgroundErrors?: string[];
}

interface CleanColor {
    colorString: string;
    cleanColor: number;
    rgb: number[];
    isValid: boolean;
}

export default class ContrastChecker extends Component<ContrastCheckerProps, ContrastCheckerState> {
    constructor(props: ContrastCheckerProps) {
        super(props);

        this.state = {
            isHex: true,
        };

        this.cleanForeground = this.cleanHex(props.foregroundColor, 'foreground');
        this.cleanBackground = this.cleanHex(props.backgroundColor, 'background');

        this.activeForeground = props.foregroundColor;
        this.activeBackground = props.backgroundColor;
    }

    activeForeground: string;
    activeBackground: string;

    radioName: string = `color-type-${createGuid()}`;

    get inputFormat(): 'hex' | 'rgb' {
        return this.state.isHex ? 'hex' : 'rgb';
    }

    get rgbForeground(): string {
        return this.hexToRGB(this.props.foregroundColor);
    }

    get rgbBackground(): string {
        return this.hexToRGB(this.props.backgroundColor);
    }

    get hexForeground(): string {
        return this.props.foregroundColor;
    }

    get hexBackground(): string {
        return this.props.backgroundColor;
    }

    get contrastValue(): number {
        if (this.props.isAPCA) {
            return APCAContrast(this.cleanBackground.cleanColor, this.cleanForeground.cleanColor);
        }

        return legacyContrast(this.cleanBackground.rgb, this.cleanForeground.rgb);
    }

    hexToRGB(hex: string): string {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    rgbToHex(rgb: string): string {
        return (
            rgb.match(/(\d+)/g)?.reduce((acc, number) => {
                return `${acc}${Number(number).toString(16).padStart(2, '0')}`;
            }, '#') ?? ''
        );
    }

    swapColors = (): void => {
        const fg = this.cleanBackground;
        const bg = this.cleanForeground;

        this.cleanForeground = fg;
        this.cleanBackground = bg;

        this.setActiveColor();

        this.props.onColorChange(fg.cleanColor, bg.cleanColor, this.contrastValue);
    };

    cleanForeground: CleanColor;
    cleanBackground: CleanColor;

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
                    colorString: '',
                    cleanColor: 0,
                    rgb: [],
                    isValid: false,
                };
        }

        for (const colorVal in colorObj!) {
            if (!/^[0-9A-F]{2}$/i.test(colorObj[colorVal])) {
                this.setError(type);
                return {
                    colorString: '',
                    cleanColor: 0,
                    rgb: [],
                    isValid: false,
                };
            }
        }

        this.clearError(type);
        workingColor = colorObj.r + colorObj.g + colorObj.b;
        return {
            colorString: `#${workingColor}`,
            cleanColor: parseInt(workingColor, 16),
            rgb: Object.values(colorObj).map((num) => parseInt(num, 16)),
            isValid: true,
        };
    };

    cleanRGB = (color: string, type: 'foreground' | 'background'): CleanColor => {
        const regex = /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g;

        if (!regex.test(color)) {
            this.setError(type);
            return {
                colorString: '',
                cleanColor: 0,
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
            colorString: `#${workingColor}`,
            cleanColor: parseInt(workingColor!, 16),
            rgb,
            isValid,
        };
    };

    setError = (type: 'foreground' | 'background'): void => {
        const msg = ['Please enter a valid hex color code'];

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

    setActiveColor = (isHex = this.state.isHex) => {
        const { colorString: fg } = this.cleanForeground;
        const { colorString: bg } = this.cleanBackground;

        if (isHex) {
            this.activeForeground = fg;
            this.activeBackground = bg;
        } else {
            this.activeForeground = this.hexToRGB(fg);
            this.activeBackground = this.hexToRGB(bg);
        }
    };

    onForegroundInput = (event: CustomEvent) => {
        let color = event.detail.formattedValue;
        const isColorInput = (event.target as HTMLInputElement).type === 'color';

        if (isColorInput && !this.state.isHex) {
            color = this.hexToRGB(color);
        }

        this.activeForeground = color;

        this.debouncedColorInputHandler(color, 'foreground');
    };

    onBackgroundInput = (event: CustomEvent) => {
        let color = event.detail.formattedValue;
        const isColorInput = (event.target as HTMLInputElement).type === 'color';

        if (isColorInput && !this.state.isHex) {
            color = this.hexToRGB(color);
        }

        this.activeBackground = color;

        this.debouncedColorInputHandler(color, 'background');
    };

    onColorInput = (color: string, type: 'foreground' | 'background') => {
        const { isHex } = this.state;
        let cleanColorObj;

        if (isHex) {
            cleanColorObj = this.cleanHex(color, type);
        } else {
            cleanColorObj = this.cleanRGB(color, type);
        }

        if (type === 'foreground') {
            this.cleanForeground = cleanColorObj;
        } else {
            this.cleanBackground = cleanColorObj;
        }

        if (cleanColorObj.isValid) {
            this.props.onColorChange(
                this.cleanForeground.cleanColor,
                this.cleanBackground.cleanColor,
                this.contrastValue
            );
        }
    };

    debouncedColorInputHandler = debounce(this.onColorInput.bind(this), 15);

    onHexSwap = (event: ChangeEvent) => {
        const isHex = (event.target as HTMLInputElement).value === 'hex';

        this.setActiveColor(isHex);

        this.setState({
            isHex,
        });
    };

    render() {
        return (
            <section className="contrast-checker">
                <div className="field-container">
                    <div className="flex">
                        <ProteanInput
                            label="Text color"
                            type="color-code"
                            format={this.inputFormat}
                            value={this.activeForeground}
                            errors={this.state.foregroundErrors}
                            oninput={this.onForegroundInput}
                        />
                        <ProteanInput
                            a11yLabel="Text color"
                            value={this.hexForeground}
                            type="color"
                            oninput={this.onForegroundInput}
                        />
                    </div>
                    <div className="color-values">
                        <div>{this.hexForeground}</div>
                        <div>|</div>
                        <div>{this.rgbForeground}</div>
                    </div>
                </div>
                <div className="contrast-value">
                    <div>Contrast value</div>
                    <h2>
                        {this.props.contrastValue.toFixed(3)}
                        {this.props.isAPCA ? (
                            <span>
                                {' '}
                                L<sup>c</sup>
                            </span>
                        ) : (
                            <span>:1</span>
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
                            value={this.activeBackground}
                            type="color-code"
                            format={this.inputFormat}
                            errors={this.state.backgroundErrors}
                            oninput={this.onBackgroundInput}
                        />
                        <ProteanInput
                            a11yLabel="Background color"
                            value={this.hexBackground}
                            type="color"
                            oninput={this.onBackgroundInput}
                        />
                    </div>
                    <div className="color-values">
                        <div>{this.hexBackground}</div>
                        <div>|</div>
                        <div>{this.rgbBackground}</div>
                    </div>
                </div>
                <div className="radio-list">
                    <RadioButton
                        value="rgb"
                        label="Use RGB"
                        name={this.radioName}
                        checked={!this.state.isHex}
                        handleChange={this.onHexSwap}
                    />
                    <RadioButton
                        value="hex"
                        label="Use Hex"
                        name={this.radioName}
                        checked={this.state.isHex}
                        handleChange={this.onHexSwap}
                    />
                </div>
                <div className="sample-container">
                    <SampleText
                        fontSize="16px"
                        fontWeight={600}
                        text="Sample text"
                        foregroundColor={this.hexForeground}
                        backgroundColor={this.hexBackground}
                    />
                </div>
            </section>
        );
    }
}
