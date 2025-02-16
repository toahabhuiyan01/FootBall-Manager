// PlayerDetailsDrawer.tsx
import {
    Drawer,
    Box,
    Typography,
    Avatar,
    Divider,
    useTheme,
    IconButton,
} from "@mui/material";
import { X } from "lucide-react";
import { Player } from "../types";

interface PlayerDetailsDrawerProps {
    player: Player | null;
    open: boolean;
    onClose: () => void;
}

export default function PlayerDetailsDrawer({
    player,
    open,
    onClose,
}: PlayerDetailsDrawerProps) {
    const theme = useTheme();

    if (!player) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: { xs: "100%", sm: 450 },
                    boxSizing: "border-box",
                    p: 4,
                    bgcolor: theme.palette.background.default,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    gap: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            color: "primary.main",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        {player.name}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <X />
                    </IconButton>
                </Box>
                {/* Player Image Section */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 4,
                        bgcolor: "background.paper",
                    }}
                >
                    <Avatar
                        src={player.photo}
                        alt={player.name}
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 0,
                            "& .MuiAvatar-img": {
                                objectFit: "cover",
                            },
                        }}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Details Section */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                        "& > *": {
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                        },
                    }}
                >
                    <DetailItem
                        emoji="🌍"
                        label="Nationality"
                        value={player.nationality}
                    />
                    <DetailItem
                        emoji="⚽"
                        label="Position"
                        value={player.position}
                    />
                    <DetailItem
                        emoji="📅"
                        label="Age"
                        value={`${player.age} years`}
                    />
                    <DetailItem emoji="🏢" label="Club" value={player.club} />
                    <DetailItem
                        emoji="💰"
                        label="Market Value"
                        value={
                            player.marketValue
                                ? `${player.marketValue}M€`
                                : "N/A"
                        }
                        highlight
                    />
                </Box>
            </Box>
        </Drawer>
    );
}

function DetailItem({
    emoji,
    label,
    value,
    highlight,
}: {
    emoji: string;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderLeft: `4px solid ${
                    highlight ? "#00e676" : "primary.main"
                }`,
            }}
        >
            <Typography
                variant="subtitle2"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                }}
            >
                <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                {label}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: highlight ? "#00e676" : "text.primary",
                    lineHeight: 1.2,
                }}
            >
                {value || "N/A"}
            </Typography>
        </Box>
    );
}
