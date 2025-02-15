import { Box, Container, Drawer, Typography, Button } from "@mui/material";
import { Player } from "../hooks/usePlayerData";
import PlayerGrid from "./PlayerGrid";

interface PlayerContentProps {
    players: Player[];
    loading: boolean;
    selectedPlayer: Player | null;
    onLoadMore: () => void;
    onPlayerClick: (player: Player) => void;
    onCloseDrawer: () => void;
}

export default function PlayerContent({
    players,
    loading,
    selectedPlayer,
    onLoadMore,
    onPlayerClick,
    onCloseDrawer,
}: PlayerContentProps) {
    return (
        <>
            <Container maxWidth="lg">
                <PlayerGrid
                    players={players}
                    loading={loading}
                    onLoadMore={onLoadMore}
                    onPlayerClick={onPlayerClick}
                />
            </Container>
            <Drawer
                anchor="right"
                open={selectedPlayer !== null}
                onClose={onCloseDrawer}
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
                            onClick={onCloseDrawer}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Close
                        </Button>
                    </Box>
                )}
            </Drawer>
        </>
    );
}
