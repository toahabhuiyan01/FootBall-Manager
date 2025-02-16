// Types.ts
export interface Country {
    name: string;
    code: string;
    flag: string;
}

export interface Team {
    team: {
        name: string;
        country: string;
        logo: string;
    };
}

export interface Filters {
    country?: string;
    club?: string;
    marketValue?: {
        min: number;
        max: number;
    };
    age?: {
        min: number;
        max: number;
    };
}
