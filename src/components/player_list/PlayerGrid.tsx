// PlayerGrid.tsx
import { useRef, useCallback } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import PlayerCard from "./PLayerCard";
import { Player } from "../types";

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
        <Box
            sx={{
                flexGrow: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid
                container
                spacing={3}
                sx={{
                    margin: 0,
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                {players.map((player, index) => (
                    <Grid
                        item
                        key={player.id + index}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        ref={
                            index === players.length - 1
                                ? lastPlayerElementRef
                                : null
                        }
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <PlayerCard player={player} onClick={onPlayerClick} />
                    </Grid>
                ))}
            </Grid>
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4,
                        mb: 4,
                    }}
                >
                    <CircularProgress size={60} thickness={4} />
                </Box>
            )}
        </Box>
    );
}
