// PlayerCard.tsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Player } from "../../hooks/usePlayerData";

interface PlayerCardProps {
    player: Player;
    onClick: (player: Player) => void;
}

export default function PlayerCard({ player, onClick }: PlayerCardProps) {
    return (
        <Card
            sx={{
                width: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                    cursor: "pointer",
                },
            }}
            onClick={() => onClick(player)}
        >
            <CardMedia
                component="img"
                alt={player.name}
                height="220"
                image={player.photo}
                sx={{
                    objectFit: "cover",
                    borderBottom: "3px solid",
                    borderColor: "primary.main",
                }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "primary.main",
                    }}
                >
                    {player.name}
                </Typography>

                <DetailItem emoji="🌍" text={player.nationality} />
                <DetailItem emoji="⚽" text={player.position} />
                <DetailItem emoji="📅" text={`${player.age} years`} />
                <DetailItem emoji="🏢" text={player.club} />

                <Typography
                    variant="subtitle1"
                    sx={{
                        mt: 2,
                        fontWeight: 700,
                        color: "success.main",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    💰 {player.marketValue}M€
                </Typography>
            </CardContent>
        </Card>
    );
}

function DetailItem({ emoji, text }: { emoji: string; text: string }) {
    return (
        <Typography
            variant="body1"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1,
                color: "text.secondary",
            }}
        >
            <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
            {text}
        </Typography>
    );
}
