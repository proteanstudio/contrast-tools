import { Component, createRef, RefObject } from 'react';

export default class ProteanTabContainer extends Component<IProteanTabContainer> {
    elementRef: RefObject<IProteanTabContainer> = createRef();

    componentDidMount() {
        this.bindProps();
    }

    componentDidUpdate() {
        this.bindProps();
    }

    bindProps() {
        const tabContainer = this.elementRef?.current as IProteanTabContainer & IDict;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ref, ...propsToCopy } = this.props;

        Object.entries(propsToCopy).forEach(([key, value]) => {
            tabContainer[key] = value;
        });
    }

    render() {
        return <protean-tab-container ref={this.elementRef}>{this.props.children}</protean-tab-container>;
    }
}
