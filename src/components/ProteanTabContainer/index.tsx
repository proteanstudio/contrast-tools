import { Component, createRef, RefObject } from 'react';

export default class ProteanTabContainer extends Component<IProteanTabContainer> {
    elementRef: RefObject<IProteanTabContainer> = createRef();

    componentDidMount() {
        this.bindChange();
    }

    bindChange() {
        if (this.elementRef?.current) {
            this.elementRef.current.onchange = this.props.onchange;
        }
    }

    render() {
        return (
            <protean-tab-container value={this.props.value} name={this.props.name} ref={this.elementRef}>
                {this.props.children}
            </protean-tab-container>
        );
    }
}
