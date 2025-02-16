import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import useAlertStore from "../store/AlertStore";
import useDebounceFunction, { delay } from "./useDebounce";

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

interface ApiResponse {
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

const API_KEY = "9fd61d75e0msh107e104bc68b2e8p1f9af6jsnea65ae8ea3a4";
const API_HOST = "api-football-v1.p.rapidapi.com";

export const usePlayerData = () => {
    const { setAlert } = useAlertStore();

    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState<Filters>({});
    const [optionalFilters, setOptionalFilters] = useState<Filters>({});

    const [pagination, setPagination] = useState({
        cache: 1,
        scroll: 0,
    });

    const playersCache = useRef<Player[]>([]);
    const playersCacheFiltered = useMemo(() => {
        const filteredPlayers = playersCache.current.filter((player) => {
            if (optionalFilters.age) {
                if (
                    player.age < optionalFilters.age.min ||
                    player.age > optionalFilters.age.max
                ) {
                    return false;
                }
            }

            if (optionalFilters.country) {
                if (player.nationality !== optionalFilters.country) {
                    return false;
                }
            }

            return true;
        });

        return filteredPlayers;
    }, [optionalFilters, playersCache]);

    const fetchPlayerAPI = async () => {
        const options = {
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v3/players/profiles",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
            },
            params: {
                search: filters.search,
                page: pagination.cache,
            },
        };

        const response = await axios.request<ApiResponse>(options);
        const newPlayers = response.data.response.map((item) => item.player);

        playersCache.current = {
            ...playersCache.current,
            ...newPlayers,
        };
        setPagination((prev) => ({
            ...prev,
            cache: prev.cache + 1,
        }));
    };

    const fetchPlayers = useCallback(
        async (forced?: boolean) => {
            if (loading) {
                return;
            }
            try {
                setLoading(true);

                const shouldApiCall =
                    (pagination.scroll + 1) * 20 > playersCacheFiltered.length;

                if (shouldApiCall || forced) {
                    await fetchPlayerAPI();
                    await delay(100);
                }

                const next20 = playersCacheFiltered.slice(
                    pagination.scroll * 20,
                    (pagination.scroll + 1) * 20
                );

                setPlayers((prev) => [...prev, ...next20]);
                setPagination((prev) => ({
                    ...prev,
                    scroll: prev.scroll + 1,
                }));
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "An error occurred while fetching players";
                setAlert(errorMessage, "error", 5000);
            } finally {
                setLoading(false);
            }
        },
        [filters, pagination]
    );

    useEffect(() => {
        setPagination((prev) => ({ ...prev, scroll: 0 }));
    }, [optionalFilters]);

    useEffect(() => {
        (async () => {
            await delay(10);
            fetchPlayers();
        })();
    }, [pagination.scroll]);

    useEffect(() => {
        fetchPlayers(true);
    }, [filters.search]);

    const updateFilters = useCallback((newFilters: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    const updateFiltersDebounced = useDebounceFunction(updateFilters, 1000);

    const updateOptionalFilters = useCallback(
        (newFilters: Partial<Filters>) => {
            setOptionalFilters((prev) => ({ ...prev, ...newFilters }));
        },
        []
    );

    const updateOptionalFiltersDebounced = useDebounceFunction(
        updateOptionalFilters,
        1000
    );

    return {
        players,
        loading,
        fetchPlayers,

        filters,
        updateFilters,
        updateFiltersDebounced,
        updateOptionalFilters,
        updateOptionalFiltersDebounced,
    };
};
