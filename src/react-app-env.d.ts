/// <reference types="node" />
/// <reference types="react-dom" />

interface IDict<T = unknown> {
    [key: string]: T;
}

interface IComponentProps<T=unknown> {
    children?: unknown;
    ref?: RefObject<T>;
}

interface IColorData {
    hexString: string;
    rgbString: string;
    activeColor: string;
    hexNumber: number;
    rgb: number[];
}

interface IProteanButton extends IComponentProps<IProteanButton> {
    class?: string;
    a11yLabel?: string;
    disabled?: boolean;
    type?: string;
    variant?: string;
    onClick?: (event?: CustomEvent) => void;
}

interface IProteanCheckbox  extends IComponentProps<IProteanCheckbox>{
    className?: string;
    a11yLabel?: string;
    alignment?: 'left' | 'right';
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    label?: string;
    onchange?: (event: CustomEvent) => void;
    variant?: string;
}

interface IProteanClickElsewhere extends IComponentProps<IProteanClickElsewhere> {
    onchange?: (event: CustomEvent) => void;
    children?: unknown;
    ref?: unknown;
}

interface IProteanIcon extends IComponentProps<IProteanClickElsewhere> {
    type?: string;
    use?: string;
}

interface IProteanInput extends IComponentProps<IProteanInput>{
    className?: string;
    a11yLabel?: string;
    ariaExpanded?: boolean | undefined;
    ariaHasPopup?: string;
    ariaRole?: string;
    disabled?: boolean;
    errors?: string[];
    format?: string;
    hints?: string[];
    label?: string;
    maxlength?: number;
    onchange?: (event: CustomEvent<FormattedValue>) => void;
    oninput?: (event: CustomEvent<FormattedValue>) => void;
    optional?: boolean;
    readonly?: boolean;
    suppressMessages?: boolean;
    type?: string;
    value?: string;
}

interface IProteanMessage extends IComponentProps<IProteanMessage>{
    className?: string;
    level?: string;
    type?: string;
    variant?: string;
}

interface IProteanOptgroup extends IComponentProps<IProteanOptgroup>{
    className?: string;
    disabled?: boolean;
    label?: string;
}

interface IProteanOption extends IComponentProps<IProteanOption> {
    active?: boolean;
    disabled?: boolean;
    disabledGroup?: boolean;
    label?: string;
    selected?: boolean;
    value?: string;
}

interface IProteanSelect extends IComponentProps<IProteanSelect> {
    className?: string;
    a11yLabel?: string;
    disabled?: boolean;
    errors?: string[];
    label?: string;
    multiple?: boolean;
    onchange?: (event: CustomEvent) => void;
    optional?: boolean;
    selectedOptions?: string[];
    value?: string;
}

interface IProteanTabContainer extends IComponentProps<IProteanTabContainer> {
    className?: string;
    name?: string;
    onchange?: (event: CustomEvent) => void;
    value?: string;
}

interface IProteanTabPane extends IComponentProps<IProteanTabContainer> {
    className?: string;
    label?: string;
    name?: string;
    value?: string;
}

declare namespace JSX {
    interface IntrinsicElements {
        'protean-button': IProteanButton;
        'protean-checkbox': IProteanCheckbox;
        'protean-click-elsewhere': IProteanClickElsewhere;
        'protean-icon': IProteanIcon;
        'protean-input': IProteanInput;
        'protean-message': IProteanMessage;
        'protean-optgroup': IProteanOptgroup;
        'protean-option': IProteanOption;
        'protean-select': IProteanSelect;
        'protean-tab-container': IProteanTabContainer;
        'protean-tab-pane': IProteanTabPane;
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
    }
}

declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

    const src: string;
    export default src;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module 'apca-w3' {
    const sRGBtoY: (sRGBcolor: number[]) => number;
    const APCAcontrast: (txtY: number, bgY: number) => number;

    export { sRGBtoY, APCAcontrast }
}