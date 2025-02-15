import { useRef, useCallback } from "react";
import { Grid2 as Grid, Box, CircularProgress } from "@mui/material";
import { Player } from "../hooks/usePlayerData";
import PlayerCard from "./PlayerCard";

interface PlayerGridProps {
    players: Player[];
    loading: boolean;
    onLoadMore: () => void;
    onPlayerClick: (player: Player) => void;
}

export default function PlayerGrid({
    players,
    loading,
    onLoadMore,
    onPlayerClick,
}: PlayerGridProps) {
    const observer = useRef<IntersectionObserver>(undefined);
    const lastPlayerElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, onLoadMore]
    );

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={3}>
                {players.map((player, index) => (
                    <Grid
                        component="div"
                        sx={{
                            width: {
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 3,
                            },
                        }}
                        key={player.id}
                        ref={
                            index === players.length - 1
                                ? lastPlayerElementRef
                                : undefined
                        }
                    >
                        <PlayerCard player={player} onClick={onPlayerClick} />
                    </Grid>
                ))}
            </Grid>
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
}
