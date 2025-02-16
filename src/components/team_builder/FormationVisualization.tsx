import { Box, Typography } from "@mui/material";
import formations from "../../consts/formations";
import { Player } from "../types";

interface FormationVisualizationProps {
    formation: string;
    selectedPlayers: { [key: string]: Player };
    onPositionClick: (position: string) => void;
}

export default function FormationVisualization({
    formation,
    selectedPlayers,
    onPositionClick,
}: FormationVisualizationProps) {
    const formationPositions = formations[formation] || formations["4-3-3"];

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                height: "600px",
                position: "relative",
                backgroundColor: "#2e7d32",
                borderRadius: "8px",
                overflow: "hidden",
                border: "2px solid #1b5e20",
            }}
        >
            {/* Field markings */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: "75%",
                    left: "30%",
                    width: "40%",
                    height: "100px",
                    border: "2px solid rgba(255, 255, 255, 0.5)",
                }}
            />

            {/* Player positions */}
            {Object.entries(formationPositions).map(([key, position]) => {
                const player = selectedPlayers[key];
                return (
                    <Box
                        key={key}
                        onClick={() => onPositionClick(key)}
                        sx={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                            transform: "translate(-50%, -50%)",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <Box
                            sx={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: player
                                    ? "#fff"
                                    : "rgba(255, 255, 255, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "4px",
                            }}
                        >
                            {player ? (
                                <img
                                    src={player.photo}
                                    alt={player.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#000", fontWeight: "bold" }}
                                >
                                    {position.label}
                                </Typography>
                            )}
                        </Box>
                        {player && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#fff",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    padding: "2px 4px",
                                    borderRadius: "4px",
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {player.name}
                            </Typography>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}
