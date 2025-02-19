import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Player } from "../components/types";
import { usePlayerData } from "../hooks/usePlayerData";
import Header from "../components/header/Header";
import FilterControls from "../components/filter/FilterControls";
import FilterTabs from "../components/filter/FilterTabs";
import PlayerContent from "../components/player_list/PlayerContent";

export default function MainContent() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const {
        players,
        loading,
        updateQs,
        fetchPlayers,
        updateFilters,
        updateFiltersDebounced,
        filters,
    } = usePlayerData();

    const handleSearchChange = (value: string) => {
        const query = value;
        setSearchQuery(query);
        updateQs(query);
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
        updateFiltersDebounced({
            category: category === "All Players" ? undefined : category,
        });
    };

    const handlePlayerClick = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleLoadMore = () => {
        fetchPlayers();
    };

    const handleCreateTeam = () => {
        navigate("/team-builder");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onCreateTeam={handleCreateTeam}
            />
            <FilterControls
                filters={filters}
                onFilterChange={updateFilters}
                onFilterChangeDebounced={updateFiltersDebounced}
            />
            <FilterTabs
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
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
    );
}
