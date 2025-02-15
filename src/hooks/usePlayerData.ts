import { useState, useCallback } from "react";
import axios from "axios";

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

    const fetchPlayers = useCallback(async (playerId?: string) => {
        try {
            setLoading(true);
            setError(null);

            const options = {
                method: "GET",
                url: "https://api-football-v1.p.rapidapi.com/v3/players/profiles",
                headers: {
                    "x-rapidapi-key": API_KEY,
                    "x-rapidapi-host": API_HOST,
                },
                params: playerId ? { player: playerId } : {},
            };

            const response = await axios.request<ApiResponse>(options);
            const newPlayers = response.data.response.map(
                (item) => item.player
            );

            setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred while fetching players"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const searchPlayers = useCallback(
        async (query: string) => {
            // Implement search logic here
            try {
                setLoading(true);
                setError(null);
                // You would typically have a different endpoint for search
                // For now, we'll just filter the existing players
                const filteredPlayers = players.filter((player) =>
                    player.name.toLowerCase().includes(query.toLowerCase())
                );
                setPlayers(filteredPlayers);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "An error occurred while searching players"
                );
            } finally {
                setLoading(false);
            }
        },
        [players]
    );

    return {
        players,
        loading,
        error,
        fetchPlayers,
        searchPlayers,
    };
};
