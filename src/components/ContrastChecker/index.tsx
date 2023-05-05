import { Component, ChangeEvent } from 'react';
import ProteanInput from '../ProteanInput';
import RadioButton from '../RadioButton';
import SampleText from '../SampleText';
import debounce from '../../utils/debounce/';
import createGuid from '../../utils/guid';
import './styles.scss';
import { ICleanColor, cleanHex, cleanRGB } from '../../utils/colors';

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
    canCopy: boolean;
    showCopyConfirmation: boolean;
}

export default class ContrastChecker extends Component<ContrastCheckerProps, ContrastCheckerState> {
    constructor(props: ContrastCheckerProps) {
        super(props);

        const canCopy = typeof navigator.clipboard?.writeText === 'function';

        this.state = {
            canCopy,
            showCopyConfirmation: false,
        };
    }

    radioName: string = `color-type-${createGuid()}`;

    get inputFormat(): 'hex' | 'rgb' {
        return this.props.isHex ? 'hex' : 'rgb';
    }

    hexToRGB(hex: string): string {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    swapColors = (): void => {
        const fg = { ...this.props.backgroundColor };
        const bg = { ...this.props.foregroundColor };

        this.props.onColorChange(fg, bg);
    };

    getCleanColor = (color: string, format: 'hex' | 'rgb', type: 'foreground' | 'background'): ICleanColor => {
        const cleanMethod = format === 'rgb' ? cleanRGB : cleanHex;
        const clean = cleanMethod(color);

        if (clean.isValid) {
            this.clearError(type);
        } else {
            this.setError(type);
        }

        return clean;
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
        const cleanColorObj = this.getCleanColor(color, this.inputFormat, type);

        const { isValid, colorData } = cleanColorObj;

        if (type === 'foreground') {
            fg = colorData;
        } else {
            bg = colorData;
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

    copyURL = async () => {
        const params = new URLSearchParams(location.search);
        params.set('text', this.props.foregroundColor.hexString.slice(1));
        params.set('background', this.props.backgroundColor.hexString.slice(1));

        const url = `${location.origin}?${params.toString()}`;

        await navigator.clipboard.writeText(url);

        this.setState({ showCopyConfirmation: true });

        setTimeout(() => {
            this.setState({ showCopyConfirmation: false });
        }, 1500);
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
                                {this.props.contrastValue.toFixed(2)} L<sup>c</sup>
                            </span>
                        ) : (
                            <span>{this.props.contrastValue.toFixed(2)}:1</span>
                        )}
                    </h2>
                    <protean-button
                        class="swap-colors"
                        variant="icon"
                        onClick={this.swapColors}
                        a11y-label="Swap colors"
                    >
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
                <div className="copy-container">
                    {this.state.showCopyConfirmation && (
                        <span aria-live="polite" className="copy-confirmation">
                            Link copied
                        </span>
                    )}
                    {this.state.canCopy && (
                        <protean-button class="copy-button" variant="secondary" onClick={this.copyURL}>
                            <span>Share these colors</span>
                            <protean-icon type="clipboard"></protean-icon>
                        </protean-button>
                    )}
                </div>
            </section>
        );
    }
}
