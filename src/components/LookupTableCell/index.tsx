import { Component } from 'react';
import APCARating from '../../utils/apca-rating/';
import './styles.scss';

export interface LookupTableCellProps {
    value: string | number;
    comparisonValue?: number;
    decorator?: string;
    ariaLabel?: string;
    rating?: number;
    tag: 'td' | 'th' | 'div';
}

export default class LookupTableCell extends Component<LookupTableCellProps> {
    get isIncalculable(): boolean {
        return this.props.decorator
            ? ['copyright', 'prohibited', 'header'].includes(this.props.decorator) ||
                  (this.props.decorator === 'caution' && this.props.value === 'N')
            : false;
    }

    get rating(): number {
        if (this.isIncalculable) {
            return 0;
        }

        if (this.props.rating) return this.props.rating;

        return APCARating(this.props.comparisonValue!, this.props.value as number);
    }

    get wrapperClasses(): string {
        const ratingClass = this.isIncalculable ? '' : ` rating-${this.rating}`;
        return `lookup-table-cell${ratingClass} ${this.props.decorator || ''}`;
    }

    render() {
        return (
            <this.props.tag className={this.wrapperClasses}>
                <div className="cell-content">
                    <div className="cell-info">
                        <div className="cell-value" aria-label={this.props.ariaLabel}>
                            {this.props.value}
                        </div>
                        {!this.isIncalculable && (
                            <ul className="cell-rating" aria-label={`WCAG 3.0 Rating ${this.rating}`}>
                                {new Array(this.rating).fill(undefined).map((i, index) => (
                                    <li key={index}></li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </this.props.tag>
        );
    }
}
