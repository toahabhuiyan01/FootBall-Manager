import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { usePlayerData } from "./hooks/usePlayerData";
import useDebounceFunction from "./hooks/useDebounce";
import { Player } from "./hooks/usePlayerData";
import AlertCentral from "./components/AlertCentral";
import Header from "./components/Header";
import PlayerFilters from "./components/PlayerFilters";
import PlayerContent from "./components/PlayerContent";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const {
        players,
        loading,
        fetchPlayers,
        searchPlayers,
        updateFilters,
        filters,
    } = usePlayerData();

    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);

    const debouncedSearch = useDebounceFunction((query: string) => {
        searchPlayers(query);
    }, 500);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        const positions = [
            "All Players",
            "Forwards",
            "Midfielders",
            "Defenders",
            "Goalkeepers",
        ];
        const category = positions[newValue];
        updateFilters({
            category: category === "All Players" ? undefined : category,
        });
    };

    const handlePlayerClick = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleLoadMore = () => {
        fetchPlayers();
    };

    const filteredPlayers = useMemo(() => {
        const positions = [
            "All Players",
            "Forwards",
            "Midfielders",
            "Defenders",
            "Goalkeepers",
        ];
        if (selectedTab === 0) return players;
        return players.filter((player) => {
            const position = player.position.toLowerCase();
            const category = positions[selectedTab].toLowerCase();
            if (category === "forwards") return position.includes("attack");
            if (category === "midfielders")
                return position.includes("midfield");
            if (category === "defenders") return position.includes("defend");
            if (category === "goalkeepers") return position.includes("keeper");
            return true;
        });
    }, [players, selectedTab]);

    return (
        <ThemeProvider theme={theme}>
            <AlertCentral />
            <Box sx={{ flexGrow: 1 }}>
                <Header
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                />
                <PlayerFilters
                    selectedTab={selectedTab}
                    filters={filters}
                    onTabChange={handleTabChange}
                    onFilterChange={updateFilters}
                />
                <PlayerContent
                    players={filteredPlayers}
                    loading={loading}
                    selectedPlayer={selectedPlayer}
                    onLoadMore={handleLoadMore}
                    onPlayerClick={handlePlayerClick}
                    onCloseDrawer={() => setSelectedPlayer(null)}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;
