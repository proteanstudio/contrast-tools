import { Component, createRef, RefObject } from 'react';

export default class ProteanCheckbox extends Component<IProteanCheckbox> {
    elementRef: RefObject<IProteanCheckbox> = createRef();

    componentDidMount() {
        this.bindProps();
    }

    componentDidUpdate() {
        this.bindProps();
    }

    bindProps() {
        const checkbox = this.elementRef.current as IProteanCheckbox & IDict;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ref, ...propsToCopy } = this.props;

        Object.entries(propsToCopy).forEach(([key, value]) => {
            checkbox[key] = value;
        });
    }

    render() {
        return <protean-checkbox ref={this.elementRef}></protean-checkbox>;
    }
}
