import { Component, ChangeEvent } from 'react';
import { createGuid } from '../../utils/guid/';
import './styles.scss';

interface RadioButtonProps {
    checked: boolean;
    label: string;
    name: string;
    value: string;
    disabled?: boolean;
    handleChange?: (event: ChangeEvent) => void;
}

export default class RadioButton extends Component<RadioButtonProps> {
    radioId: string = `radio-button-${createGuid()}`;

    render() {
        return (
            <div className="radio-button" data-checked={this.props.checked}>
                <input
                    className="sr"
                    type="radio"
                    id={this.radioId}
                    name={this.props.name}
                    value={this.props.value}
                    disabled={this.props.disabled ?? false}
                    checked={this.props.checked}
                    onChange={this.props.handleChange}
                />
                <label htmlFor={this.radioId}>
                    <svg
                        className="radio-symbol"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        focusable="false"
                        aria-hidden="true"
                    >
                        <circle className="radio-outer" cx="12" cy="12" r="11" />
                        {this.props.checked && <circle className="radio-inner" cx="12" cy="12" r="6" />}
                    </svg>
                    <span className="label-text">{this.props.label}</span>
                </label>
            </div>
        );
    }
}
