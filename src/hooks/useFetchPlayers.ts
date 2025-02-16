import axios from "axios";
import { useEffect, useState } from "react";
import { ApiResponse, Filters, Player } from "../components/types";
import { create } from "zustand";

// const API_KEY = "9fd61d75e0msh107e104bc68b2e8p1f9af6jsnea65ae8ea3a4asdfg";
// const API_HOST = "api-football-v1.p.rapidapi.com";

interface PlayerState {
    items: Player[];
    page: number;
    hasMore: boolean;
    loading: boolean;
}

interface StoreType {
    playerState: PlayerState;
    setPlayerState: (state: Partial<PlayerState>) => void;
}

const useStore = create<StoreType>((set) => ({
    playerState: {
        items: [] as Player[],
        page: 1,
        hasMore: true,
        loading: false,
    },
    setPlayerState: (state) =>
        set((prev) => ({ playerState: { ...prev.playerState, ...state } })),
}));

const useFetchPlayers = () => {
    const { playerState, setPlayerState } = useStore();
    const [qs, setQS] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [filters, setFilters] = useState<Filters>({});

    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

    async function fetchPlayerAPI(reset?: boolean) {
        const { items, page, hasMore, loading } = playerState;

        if ((loading || !hasMore) && !reset) {
            return;
        }

        try {
            setPlayerState({ loading: true });

            const options = {
                method: "GET",
                url: "https://link-share-liard.vercel.app/api/football-api",
                // headers: {
                // "x-rapidapi-key": API_KEY,
                // "x-rapidapi-host": API_HOST,
                // },
                params: {
                    search: qs,
                    page: reset ? 1 : page,
                },
            };

            const response = await axios.request<ApiResponse>(options);
            // const newPlayers = response.data.response.map((item) => item.player);
            const newPlayers = response.data.players;
            if (newPlayers.length < 250) {
                setPlayerState({ hasMore: false });
            }

            setPlayerState({
                items: reset ? newPlayers : [...items, ...newPlayers],
                page: reset ? 2 : page + 1,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setPlayerState({ loading: false });
        }
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        console.log("fetching players");
        fetchPlayerAPI(true);
    }, [qs, isMounted]);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        const { items } = playerState;
        const filtered = items.filter((player) => {
            if (
                filters.age &&
                (player.age < filters.age.min || player.age > filters.age.max)
            )
                return false;

            if (filters.category && player.position !== filters.category)
                return false;

            if (filters.country && player.nationality !== filters.country)
                return false;

            return true;
        });

        if (filtered.length < 20) {
            fetchPlayerAPI();
        }

        setFilteredPlayers(filtered);
    }, [isMounted, filters, playerState.items]);

    return {
        filters,
        setFilters,
        fetchMore: fetchPlayerAPI,
        players: filteredPlayers,
        loading: playerState.loading,
        onQsChange: (str: string) => setQS(str),
    };
};

export default useFetchPlayers;
