import { useState, useCallback, useEffect, useMemo } from "react";
import useDebounceFunction, { delay } from "./useDebounce";
import useFetchPlayers from "./useFetchPlayers";

export interface Filters {
    category?: string;
    country?: string;
    age?: {
        min: number;
        max: number;
    };
}

export const usePlayerData = () => {
    const {
        filters,
        setFilters,
        fetchMore,
        onQsChange,
        loading: loadingPlayer,
        players,
    } = useFetchPlayers();

    const [mounted, setMounted] = useState(false);
    const [pagination, setPagination] = useState(1);

    const filteredPlayers = useMemo(() => {
        const selected = players.slice(0, pagination * 20);

        return selected;
    }, [pagination, players]);

    const fetchPlayers = async (page?: number) => {
        const mark = page || pagination;

        if (mark * 20 > players.length) {
            await fetchMore();
            await delay(500);
        }

        setPagination(mark + 1);
    };

    const updateQs = useDebounceFunction(onQsChange, 1000);

    useEffect(() => {
        if (mounted) {
            fetchPlayers();
        } else {
            setMounted(true);
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;
        fetchPlayers(1);
    }, [filters]);

    const updateFilters = useCallback((newFilters: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    const updateFiltersDebounced = useDebounceFunction(updateFilters, 1000);

    return {
        players: filteredPlayers,
        loading: loadingPlayer,
        fetchPlayers,

        filters,
        updateFilters,
        updateFiltersDebounced,
        updateQs,
    };
};
