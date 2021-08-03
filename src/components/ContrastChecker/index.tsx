import { Component, ChangeEvent } from 'react';
import ProteanInput from '../ProteanInput';
import RadioButton from '../RadioButton';
import SampleText from '../SampleText';
import './styles.scss';

interface ContrastCheckerProps {
    foregroundColor: string;
    backgroundColor: string;
    contrastValue: number;
    isAPCA: boolean;
    onColorChange: (foregroundColor: number, backgroundColor: number) => void;
}

interface ContrastCheckerState {
    isHex: boolean;
    foregroundErrors?: string[];
    backgroundErrors?: string[];
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

        this.props.onColorChange(fg, bg);
        this.cleanForeground = fg;
        this.cleanBackground = bg;

        if (this.state.isHex) {
            this.activeForeground = this.hexBackground;
            this.activeBackground = this.hexForeground;
        } else {
            this.activeForeground = this.rgbBackground;
            this.activeBackground = this.rgbForeground;
        }
    };

    cleanForeground: number = 0;
    cleanBackground: number = 0;

    cleanHex = (color: string, type: 'foreground' | 'background'): number => {
        let workingColor = color.substring(1);
        let colorObj: {
            r: string;
            g: string;
            b: string;
            [key: string]: string;
        };

        switch (workingColor.length) {
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
                return 0; //revisit
        }

        for (const colorVal in colorObj!) {
            if (!/^[0-9A-F]{2}$/i.test(colorObj[colorVal])) {
                this.setError(type);
                return 0; //revisit
            }
        }

        this.clearError(type);
        workingColor = colorObj.r + colorObj.g + colorObj.b;
        return parseInt(workingColor, 16);
    };

    cleanRGB = (color: string, type: 'foreground' | 'background'): number => {
        const regex = /rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g;

        if (!regex.test(color)) {
            this.setError(type);
            return 0;
        }

        const { workingColor, isValid } = color.match(/\d{1,3}/g)?.reduce(
            (acc, item) => {
                let num = Number(item);
                console.log(item, num);
                if (num > 255) {
                    this.setError(type);
                    acc.isValid = false;
                }

                acc.workingColor += num.toString(16).padStart(2, '0');

                return acc;
            },
            { workingColor: '', isValid: true }
        )!;

        if (isValid) {
            this.clearError(type);
        }

        return parseInt(workingColor!, 16);
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
        if (type === 'foreground') {
            this.setState({ foregroundErrors: undefined });
            return;
        }

        this.setState({ backgroundErrors: undefined });
    };

    onForegroundInput = (event: CustomEvent) => {
        this.onColorInput(event.detail.formattedValue, 'foreground');
    };

    onBackgroundInput = (event: CustomEvent) => {
        this.onColorInput(event.detail.formattedValue, 'background');
    };

    onColorInput = (color: string, type: 'foreground' | 'background') => {
        let cleanColor;

        if (this.state.isHex) {
            cleanColor = this.cleanHex(color, type);
        } else {
            cleanColor = this.cleanRGB(color, type);
        }

        if (type === 'foreground') {
            this.cleanForeground = cleanColor;
        } else {
            this.cleanBackground = cleanColor;
        }

        if (!this.state.backgroundErrors && !this.state.foregroundErrors) {
            this.props.onColorChange(this.cleanForeground, this.cleanBackground);
        }
    };

    onHexSwap = (event: ChangeEvent) => {
        const isHex = (event.target as HTMLInputElement).value === 'hex';

        if (isHex) {
            this.activeForeground = this.hexForeground;
            this.activeBackground = this.hexBackground;
        } else {
            this.activeForeground = this.rgbForeground;
            this.activeBackground = this.rgbBackground;
        }

        this.setState({
            isHex,
        });
    };

    render() {
        return (
            <section className="contrast-checker">
                <div>
                    <div className="flex">
                        <ProteanInput
                            label="Text color"
                            value={this.activeForeground}
                            type="color-code"
                            format={this.inputFormat}
                            errors={this.state.foregroundErrors}
                            oninput={this.onForegroundInput}
                        />
                        <ProteanInput
                            a11y-label="Text color"
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
                        {this.props.contrastValue.toFixed(3)}{this.props.isAPCA ? (<span> L<sup>c</sup></span>) : (<span>:1</span>)}
                    </h2>
                    <protean-button variant="icon" onClick={this.swapColors}>
                        <protean-icon type="swap"></protean-icon>
                    </protean-button>
                </div>
                <div>
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
                            a11y-label="Background color"
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
                <div>
                    <RadioButton
                        value="rgb"
                        label="Use RGB"
                        name="color-type"
                        checked={!this.state.isHex}
                        handleChange={this.onHexSwap}
                    />
                    <RadioButton
                        value="hex"
                        label="Use Hex"
                        name="color-type"
                        checked={this.state.isHex}
                        handleChange={this.onHexSwap}
                    />
                </div>
                <div>
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
