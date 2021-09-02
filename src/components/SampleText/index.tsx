import { Component } from 'react';
import './styles.scss';

export interface SampleTextProps {
    foregroundColor: string;
    backgroundColor: string;
    fontSize: string;
    fontWeight: number;
    text: string;
    rating?: number;
}

export default class SampleText extends Component<SampleTextProps> {
    render() {
        const { backgroundColor, foregroundColor, text, fontSize, fontWeight, rating } = this.props;

        const wrapperStyle = {
            backgroundColor,
            color: foregroundColor,
        };

        const mainTextStyle = {
            fontSize,
            fontWeight,
        };

        return (
            <div className="sample-text" style={wrapperStyle}>
                <div className="main-text" style={mainTextStyle}>
                    {text}
                </div>
                {rating !== undefined && (
                    <div className="rating-text">
                        Rating: <strong>{rating}</strong>
                    </div>
                )}
            </div>
        );
    }
}
