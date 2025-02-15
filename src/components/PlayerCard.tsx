import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Player } from "../hooks/usePlayerData";

interface PlayerCardProps {
    player: Player;
    onClick: (player: Player) => void;
}

export default function PlayerCard({ player, onClick }: PlayerCardProps) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                    transform: "scale(1.02)",
                },
            }}
            onClick={() => onClick(player)}
        >
            <CardMedia
                component="img"
                height="240"
                image={player.photo}
                alt={player.name}
                sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {player.name}
                </Typography>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Country: {player.nationality}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Position: {player.position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Age: {player.age}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
