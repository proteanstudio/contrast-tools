export interface LookupTableItem {
    value: string | number;
    decorator?: 'header' | 'prohibited' | 'copyright' | 'preferred' | 'not-recommended' | 'body-plus';
    ariaLabel?: string;
}

export const lookupTableItems: LookupTableItem[][] = [
    [
        {
            value: '12px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
    ],
    [
        {
            value: '14px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 100,
            decorator: 'preferred',
        },
        {
            value: 100,
            decorator: 'preferred',
        },
        {
            value: 90,
            decorator: 'preferred',
        },
        {
            value: 75,
            decorator: 'preferred',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
    ],
    [
        {
            value: '15px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 100,
            decorator: 'preferred',
        },
        {
            value: 90,
            decorator: 'preferred',
        },
        {
            value: 75,
            decorator: 'preferred',
        },
        {
            value: 70,
            decorator: 'body-plus',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
    ],
    [
        {
            value: '16px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 90,
            decorator: 'preferred',
        },
        {
            value: 75,
            decorator: 'preferred',
        },
        {
            value: 70,
            decorator: 'body-plus',
        },
        {
            value: 60,
            decorator: 'body-plus',
        },
        {
            value: 60,
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
    ],
    [
        {
            value: '18px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 100,
            decorator: 'preferred',
        },
        {
            value: 75,
            decorator: 'preferred',
        },
        {
            value: 70,
            decorator: 'body-plus',
        },
        {
            value: 60,
            decorator: 'body-plus',
        },
        {
            value: 55,
            decorator: 'body-plus',
        },
        {
            value: 55,
        },
        {
            value: 55,
        },
    ],
    [
        {
            value: '21px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 90,
            decorator: 'preferred',
        },
        {
            value: 70,
            decorator: 'preferred',
        },
        {
            value: 60,
            decorator: 'body-plus',
        },
        {
            value: 55,
            decorator: 'body-plus',
        },
        {
            value: 50,
            decorator: 'body-plus',
        },
        {
            value: 50,
        },
        {
            value: 50,
        },
    ],
    [
        {
            value: '24px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 75,
            decorator: 'preferred',
        },
        {
            value: 60,
            decorator: 'body-plus',
        },
        {
            value: 55,
            decorator: 'body-plus',
        },
        {
            value: 50,
            decorator: 'body-plus',
        },
        {
            value: 45,
            decorator: 'body-plus',
        },
        {
            value: 45,
        },
        {
            value: 45,
        },
    ],
    [
        {
            value: '28px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 100,
        },
        {
            value: 70,
            decorator: 'body-plus',
        },
        {
            value: 55,
            decorator: 'body-plus',
        },
        {
            value: 50,
            decorator: 'body-plus',
        },
        {
            value: 45,
            decorator: 'body-plus',
        },
        {
            value: 43,
            decorator: 'body-plus',
        },
        {
            value: 43,
        },
        {
            value: 43,
        },
    ],
    [
        {
            value: '32px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 90,
        },
        {
            value: 65,
            decorator: 'body-plus',
        },
        {
            value: 50,
            decorator: 'body-plus',
        },
        {
            value: 45,
            decorator: 'body-plus',
        },
        {
            value: 43,
            decorator: 'body-plus',
        },
        {
            value: 40,
            decorator: 'body-plus',
        },
        {
            value: 40,
        },
        {
            value: 40,
        },
    ],
    [
        {
            value: '36px',
            decorator: 'header',
        },
        {
            value: 'X',
            decorator: 'prohibited',
        },
        {
            value: 75,
        },
        {
            value: 60,
            decorator: 'body-plus',
        },
        {
            value: 45,
            decorator: 'body-plus',
        },
        {
            value: 43,
            decorator: 'body-plus',
        },
        {
            value: 40,
            decorator: 'body-plus',
        },
        {
            value: 38,
            decorator: 'body-plus',
        },
        {
            value: 38,
        },
        {
            value: 38,
        },
    ],
    [
        {
            value: '42px',
            decorator: 'header',
        },
        {
            value: 100,
            decorator: 'not-recommended',
        },
        {
            value: 70,
        },
        {
            value: 55,
        },
        {
            value: 43,
        },
        {
            value: 40,
        },
        {
            value: 38,
        },
        {
            value: 35,
        },
        {
            value: 35,
        },
        {
            value: 35,
        },
    ],
    [
        {
            value: '48px',
            decorator: 'header',
        },
        {
            value: 90,
            decorator: 'not-recommended',
        },
        {
            value: 60,
        },
        {
            value: 50,
        },
        {
            value: 40,
        },
        {
            value: 38,
        },
        {
            value: 35,
        },
        {
            value: 33,
        },
        {
            value: 33,
        },
        {
            value: 33,
        },
    ],
    [
        {
            value: '60px',
            decorator: 'header',
        },
        {
            value: 75,
            decorator: 'not-recommended',
        },
        {
            value: 55,
        },
        {
            value: 45,
        },
        {
            value: 38,
        },
        {
            value: 35,
        },
        {
            value: 33,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
    ],
    [
        {
            value: '72px',
            decorator: 'header',
        },
        {
            value: 60,
            decorator: 'not-recommended',
        },
        {
            value: 50,
        },
        {
            value: 40,
        },
        {
            value: 35,
        },
        {
            value: 33,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
    ],
    [
        {
            value: '96px',
            decorator: 'header',
        },
        {
            value: 50,
            decorator: 'not-recommended',
        },
        {
            value: 45,
        },
        {
            value: 35,
        },
        {
            value: 33,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
        {
            value: 30,
        },
    ],
];
