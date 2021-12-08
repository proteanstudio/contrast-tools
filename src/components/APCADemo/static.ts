export interface LookupTableItem {
    value: string | number;
    decorator?: 'header' | 'prohibited' | 'copyright' | 'preferred' | 'caution' | 'not-recommended' | 'non-text';
    ariaLabel?: string;
}

export const lookupTableItems: LookupTableItem[][] = [
    [
        {
            value: '10px',
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
            value: '10.5px',
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
            value: '11px',
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
            value: '©',
            decorator: 'copyright',
        },
        {
            value: 90,
            decorator: 'caution',
        },
        {
            value: 75,
            decorator: 'caution',
        },
        {
            value: 75,
            decorator: 'caution',
        },
        {
            value: 75,
            decorator: 'caution',
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
            value: 90,
            decorator: 'preferred',
        },
        {
            value: 85,
            decorator: 'preferred',
        },
        {
            value: 80,
            decorator: 'preferred',
        },
        {
            value: 75,
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
            value: '©',
            decorator: 'copyright',
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
            value: 70,
            decorator: 'preferred',
        },
        {
            value: 65,
            decorator: 'preferred',
        },
        {
            value: 60,
        },
        {
            value: 55,
            decorator: 'caution',
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
            value: 90,
            decorator: 'preferred',
        },
        {
            value: 70,
            decorator: 'preferred',
        },
        {
            value: 65,
            decorator: 'preferred',
        },
        {
            value: 60,
            decorator: 'preferred',
        },
        {
            value: 55,
        },
        {
            value: 50,
            decorator: 'caution',
        },
        {
            value: 45,
            decorator: 'caution',
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
            value: 85,
            decorator: 'preferred',
        },
        {
            value: 65,
            decorator: 'preferred',
        },
        {
            value: 60,
            decorator: 'preferred',
        },
        {
            value: 55,
            decorator: 'preferred',
        },
        {
            value: 50,
        },
        {
            value: 45,
            decorator: 'caution',
        },
        {
            value: 40,
            decorator: 'caution',
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
            value: 90,
        },
        {
            value: 75,
            decorator: 'preferred',
        },
        {
            value: 60,
            decorator: 'preferred',
        },
        {
            value: 55,
            decorator: 'preferred',
        },
        {
            value: 50,
            decorator: 'preferred',
        },
        {
            value: 45,
        },
        {
            value: 40,
            decorator: 'caution',
        },
        {
            value: 35,
            decorator: 'caution',
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
            value: 85,
        },
        {
            value: 70,
        },
        {
            value: 55,
        },
        {
            value: 50,
        },
        {
            value: 45,
        },
        {
            value: 40,
            decorator: 'caution',
        },
        {
            value: 35,
            decorator: 'caution',
        },
        {
            value: 30,
            decorator: 'caution',
        },
    ],
    [
        {
            value: '42px',
            decorator: 'header',
        },
        {
            value: 90,
            decorator: 'not-recommended',
        },
        {
            value: 75,
        },
        {
            value: 60,
        },
        {
            value: 50,
        },
        {
            value: 45,
        },
        {
            value: 40,
            decorator: 'caution',
        },
        {
            value: 35,
            decorator: 'caution',
        },
        {
            value: 30,
            decorator: 'caution',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
    ],
    [
        {
            value: '56px',
            decorator: 'header',
        },
        {
            value: 85,
            decorator: 'not-recommended',
        },
        {
            value: 70,
        },
        {
            value: 55,
        },
        {
            value: 45,
        },
        {
            value: 40,
            decorator: 'caution',
        },
        {
            value: 35,
            decorator: 'caution',
        },
        {
            value: 30,
            decorator: 'caution',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
    ],
    [
        {
            value: '72px',
            decorator: 'header',
        },
        {
            value: 75,
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
            decorator: 'caution',
        },
        {
            value: 35,
            decorator: 'caution',
        },
        {
            value: 30,
            decorator: 'caution',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
    ],
    [
        {
            value: '96px',
            decorator: 'header',
        },
        {
            value: 70,
            decorator: 'not-recommended',
        },
        {
            value: 55,
        },
        {
            value: 45,
        },
        {
            value: 35,
            decorator: 'caution',
        },
        {
            value: 30,
            decorator: 'caution',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
    ],
    [
        {
            value: '128px',
            decorator: 'header',
        },
        {
            value: 60,
            decorator: 'not-recommended',
        },
        {
            value: 45,
        },
        {
            value: 40,
            decorator: 'caution',
        },
        {
            value: 30,
            decorator: 'caution',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
        {
            value: 'NT',
            decorator: 'non-text',
        },
    ],
];
