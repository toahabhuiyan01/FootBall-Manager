import "./App.css";
import { useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { usePlayerData } from "./hooks/usePlayerData";
import { Player } from "./hooks/usePlayerData";
import AlertCentral from "./components/alert/AlertCentral";
import Header from "./components/header/Header";
import PlayerContent from "./components/player_list/PlayerContent";
import FilterControls from "./components/filter/FilterControls";
import FilterTabs from "./components/filter/FilterTabs";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const {
        players,
        loading,
        fetchPlayers,
        updateFiltersDebounced,

        updateOptionalFilters,
        updateOptionalFiltersDebounced,
        filters,
    } = usePlayerData();

    const handleSearchChange = (value: string) => {
        const query = value;
        setSearchQuery(query);
        updateFiltersDebounced({
            search: query,
        });
    };

    const handleTabChange = (newValue: number) => {
        setSelectedTab(newValue);
        const positions = [
            "All Players",
            "Attacker",
            "Midfielder",
            "Defender",
            "Goalkeeper",
        ];
        const category = positions[newValue];
        updateOptionalFilters({
            category: category === "All Players" ? undefined : category,
        });
    };

    const handlePlayerClick = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleLoadMore = () => {
        fetchPlayers();
    };

    return (
        <ThemeProvider theme={theme}>
            <AlertCentral />
            <Box sx={{ flexGrow: 1 }}>
                <Header
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                />
                <FilterControls
                    filters={filters}
                    onFilterChange={updateOptionalFilters}
                    onFilterChangeDebounced={updateOptionalFiltersDebounced}
                />
                <FilterTabs
                    onTabChange={handleTabChange}
                    selectedTab={selectedTab}
                />
                <PlayerContent
                    players={players}
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
