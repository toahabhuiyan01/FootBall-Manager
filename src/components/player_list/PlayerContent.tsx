// PlayerContent.tsx
import { Box } from "@mui/material";
import PlayerGrid from "./PlayerGrid";
import PlayerDetailsDrawer from "./PlayerDetailDrawer";
import { Player } from "../types";

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
            <Box component="main" sx={{ flex: 1 }}>
                <PlayerGrid
                    players={players}
                    loading={loading}
                    onLoadMore={onLoadMore}
                    onPlayerClick={onPlayerClick}
                />
            </Box>

            <PlayerDetailsDrawer
                player={selectedPlayer}
                open={!!selectedPlayer}
                onClose={onCloseDrawer}
            />
        </>
    );
}
