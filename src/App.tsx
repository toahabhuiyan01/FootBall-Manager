import "./App.css";
import { useEffect, useMemo, useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    Tab,
    Tabs,
    Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import theme from "./theme";
import { usePlayerData } from "./hooks/usePlayerData";
import useDebounceFunction from "./hooks/useDebounce";
import PlayerGrid from "./components/PlayerGrid";
import FilterControls from "./components/FilterControls";
import { Player } from "./hooks/usePlayerData";
import AlertCentral from "./components/AlertCentral";
import { Drawer } from "@mui/material";

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
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            <SportsSoccerIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 0, mr: 4 }}
                        >
                            Football Manager
                        </Typography>
                        <TextField
                            size="small"
                            placeholder="Search players..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{
                                flexGrow: 1,
                                mr: 2,
                                "& .MuiInputBase-root": {
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.15)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.25)",
                                    },
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ ml: 2 }}
                        >
                            Create Team
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        aria-label="player categories"
                        centered
                    >
                        <Tab label="All Players" />
                        <Tab label="Forwards" />
                        <Tab label="Midfielders" />
                        <Tab label="Defenders" />
                        <Tab label="Goalkeepers" />
                    </Tabs>
                </Box>
                <Container maxWidth="lg" sx={{ mt: 2 }}>
                    <FilterControls
                        filters={filters}
                        onFilterChange={updateFilters}
                    />
                    <Divider sx={{ my: 2 }} />

                    <PlayerGrid
                        players={filteredPlayers}
                        loading={loading}
                        onLoadMore={handleLoadMore}
                        onPlayerClick={handlePlayerClick}
                    />
                </Container>
            </Box>
            <Drawer
                anchor="right"
                open={selectedPlayer !== null}
                onClose={() => setSelectedPlayer(null)}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: { xs: "100%", sm: 400 },
                        padding: 3,
                    },
                }}
            >
                {selectedPlayer && (
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 3,
                            }}
                        >
                            <img
                                src={selectedPlayer.photo}
                                alt={selectedPlayer.name}
                                style={{
                                    width: 200,
                                    height: 200,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                        </Box>
                        <Typography variant="h5" gutterBottom>
                            {selectedPlayer.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Position: {selectedPlayer.position}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Club: {selectedPlayer.club}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Age: {selectedPlayer.age}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Nationality: {selectedPlayer.nationality}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Height: {selectedPlayer.height}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Weight: {selectedPlayer.weight}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Market Value: €{selectedPlayer.marketValue}M
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setSelectedPlayer(null)}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Close
                        </Button>
                    </Box>
                )}
            </Drawer>
        </ThemeProvider>
    );
}

export default App;
