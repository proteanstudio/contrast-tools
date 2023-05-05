import { Component, createRef, RefObject } from 'react';

export default class ProteanInput extends Component<IProteanInput> {
    elementRef: RefObject<IProteanInput> = createRef();

    componentDidMount() {
        this.bindProps();
    }

    componentDidUpdate() {
        this.bindProps();
    }

    bindProps() {
        const input = this.elementRef.current as IProteanInput & IDict;

        const { children, ref, ...propsToCopy } = this.props;

        Object.entries(propsToCopy).forEach(([key, value]) => {
            input[key] = value;
        });
    }

    render() {
        return <protean-input ref={this.elementRef}></protean-input>;
    }
}
