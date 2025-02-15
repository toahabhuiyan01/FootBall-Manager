import { useState, useCallback, useRef } from "react";
import axios from "axios";
import useAlertStore from "../store/AlertStore";
import PlayerCard from "../components/PlayerCard";

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
    searchQuery?: string;
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
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAlert } = useAlertStore();
    const [filters, setFilters] = useState<Filters>({});

    const [pagination, setPagination] = useState({
        cache: 1,
        scroll: 1,
    });

    const playersCache = useRef<Player[]>([]);

    const fetchPlayers = useCallback(
        async (playerId?: string) => {
            try {
                setLoading(true);
                setError(null);

                if (pagination.scroll + 1 * 20 <= PlayerCard.length) {
                    const next20 = playersCache.current.slice(
                        pagination.scroll * 20,
                        (pagination.scroll + 1) * 20
                    );

                    setPlayers((prev) => [...prev, ...next20]);
                    setPagination((prev) => ({
                        ...prev,
                        scroll: prev.scroll + 1,
                    }));

                    return;
                }

                const options = {
                    method: "GET",
                    url: "https://api-football-v1.p.rapidapi.com/v3/players/profiles",
                    headers: {
                        "x-rapidapi-key": API_KEY,
                        "x-rapidapi-host": API_HOST,
                    },
                    params: {
                        player: playerId,
                        search: filters.searchQuery,
                        country: filters.country,
                        team: filters.club,
                    },
                };

                const response = await axios.request<ApiResponse>(options);
                const newPlayers = response.data.response.map(
                    (item) => item.player
                );

                // Apply client-side filters for market value and age
                const filteredPlayers = newPlayers.filter((player) => {
                    if (filters.marketValue) {
                        if (
                            player.marketValue < filters.marketValue.min ||
                            player.marketValue > filters.marketValue.max
                        ) {
                            return false;
                        }
                    }
                    if (filters.age) {
                        if (
                            player.age < filters.age.min ||
                            player.age > filters.age.max
                        ) {
                            return false;
                        }
                    }
                    return true;
                });

                const allPlayers = [
                    ...playersCache.current,
                    ...filteredPlayers,
                ];

                playersCache.current = [...allPlayers];

                const next20 = allPlayers.slice(
                    pagination.scroll * 20,
                    (pagination.scroll + 1) * 20
                );

                setPlayers((prev) => [...prev, ...next20]);
                setPagination((prev) => ({
                    cache: prev.cache + 1,
                    scroll: prev.scroll + 1,
                }));
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "An error occurred while fetching players";
                setError(errorMessage);
                setAlert(errorMessage, "error", 5000);
            } finally {
                setLoading(false);
            }
        },
        [filters]
    );

    const searchPlayers = useCallback(
        async (query: string) => {
            setFilters((prev) => ({ ...prev, searchQuery: query }));
            try {
                setLoading(true);
                setError(null);
                await fetchPlayers();
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "An error occurred while searching players";
                setError(errorMessage);
                setAlert(errorMessage, "error", 5000);
            } finally {
                setLoading(false);
            }
        },
        [fetchPlayers]
    );

    const updateFilters = useCallback((newFilters: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    return {
        players,
        loading,
        error,
        fetchPlayers,
        searchPlayers,
        updateFilters,
        filters,
    };
};
