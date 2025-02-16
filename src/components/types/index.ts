export interface Player {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
        date: string;
        place: string;
        country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    number: number;
    position: string;
    photo: string;
    club: string;
    marketValue: number;
}

export interface Filters {
    category?: string;
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
    search?: string;
}

export interface ApiResponse {
    get: string;
    parameters: {
        player: string;
    };
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: Array<{
        player: Player;
    }>;
}
