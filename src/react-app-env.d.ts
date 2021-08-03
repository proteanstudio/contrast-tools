/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface IDict<T=unknown> {
    [key: string]: T
}

interface IProteanButton {
    a11yLabel?: string;
    disabled?: boolean;
    type?: string;
    variant?: string;
    children?: unknown;
    ref?: unknown;
    onClick?: (event?: CustomEvent) => void;
};

interface IProteanCheckbox {
    a11yLabel?: string;
    alignment?: 'left' | 'right';
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    label?: string;
    onchange?: (event: CustomEvent<any>) => void;
    variant?: string;
    ref?: unknown;
};

interface IProteanClickElsewhere {
    onchange?: (event: CustomEvent<any>) => void;
    children?: unknown;
    ref?: unknown;
};

interface IProteanIcon {
    type?: string;
    use?: string;
    children?: unknown;
    ref?: unknown;
};

interface IProteanInput {
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
    children?: unknown;
    ref?: unknown;
};

interface IProteanMessage {
    level?: string;
    type?: string;
    variant?: string;
    children?: unknown;
    ref?: unknown;
};

interface IProteanOptgroup {
    disabled?: boolean;
    label?: string;
    children?: unknown;
    ref?: unknown;
};

interface IProteanOption {
    active?: boolean;
    disabled?: boolean;
    disabledGroup?: boolean;
    label?: string;
    selected?: boolean;
    value?: string;
    children?: unknown;
    ref?: unknown;
};

interface IProteanSelect {
    a11yLabel?: string;
    disabled?: boolean;
    errors?: string[];
    label?: string;
    multiple?: boolean;
    onchange?: (event: CustomEvent<any>) => void;
    optional?: boolean;
    selectedOptions?: string[];
    value?: string;
    children?: unknown;
    ref?: unknown;
};

interface IProteanTabContainer {
    name?: string;
    onchange?: (event: CustomEvent<any>) => void;
    value?: string;
    children?: unknown;
    ref?: unknown;
};

interface IProteanTabPane {
    guid?: number;
    index?: number;
    label?: string;
    name?: string;
    selected?: boolean;
    value?: string;
    children?: unknown;
    ref?: unknown;
};

declare namespace JSX {
    interface IntrinsicElements {
        'protean-button': IProteanButton
        'protean-checkbox': IProteanCheckbox;
        'protean-click-elsewhere': IProteanClickElsewhere
        'protean-icon': IProteanIcon;
        'protean-input': IProteanInput
        'protean-message': IProteanMessage;
        'protean-optgroup': IProteanOptgroup;
        'protean-option': IProteanOption;
        'protean-select': IProteanSelect;
        'protean-tab-container': IProteanTabContainer;
        'protean-tab-pane': IProteanTabPane
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
