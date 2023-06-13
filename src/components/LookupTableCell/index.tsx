import { Component } from 'react';
import APCARating from '../../utils/apca-rating/';
import './styles.scss';

export interface LookupTableCellProps {
    value: string | number;
    comparisonValue?: number;
    decorator?: string;
    rating?: number;
    ariaLabel?: string;
    tag: 'td' | 'th' | 'div';
}

export default class LookupTableCell extends Component<LookupTableCellProps> {
    get isIncalculable(): boolean {
        const decorator = this.props.decorator;
        return decorator
            ? ['copyright', 'prohibited', 'header'].includes(decorator) ||
                  (['body-plus', 'not-recommended', 'preferred'].includes(decorator) && this.props.value === 'N')
            : this.props.comparisonValue === undefined || false;
    }

    get rating(): number {
        if (this.props.rating) return this.props.rating;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return APCARating(this.props.comparisonValue!, this.props.value as number);
    }

    get wrapperClasses(): string {
        const ratingClass = this.isIncalculable ? '' : ` rating-${this.rating}`;
        return `lookup-table-cell${ratingClass} ${this.props.decorator || ''}`;
    }

    renderSup() {
        const sups = new Map([
            ['preferred', <sup>P</sup>],
            ['body-plus', <sup>+</sup>],
        ]);
        return sups.get(this.props.decorator ?? '') ?? null;
    }

    render() {
        return (
            <this.props.tag className={this.wrapperClasses}>
                <div className="cell-content">
                    <div className="cell-info">
                        <div className="cell-value" aria-label={this.props.ariaLabel}>
                            {this.props.value}
                            {this.renderSup()}
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
