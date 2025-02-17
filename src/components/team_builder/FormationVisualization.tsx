import { Box, Typography, IconButton, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import formations, { getPlayerType } from "../../consts/formations";
import { Player } from "../types";
import PlayerSelection from "./PlayerSelection";
import PlayerDetailsDrawer from "../player_list/PlayerDetailDrawer";

interface FormationVisualizationProps {
    formation: string;
    selectedPlayers: { [key: string]: Player };
    onSelectionChange: (position: string, player: Player) => void;
    onSelectionClear: (position: string) => void;
}

export default function FormationVisualization({
    formation,
    selectedPlayers,
    onSelectionChange,
    onSelectionClear,
}: FormationVisualizationProps) {
    const formationPositions = formations[formation] || formations["4-3-3"];
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [clickedPosition, setClickedPosition] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const handlePositionClick = (
        event: React.MouseEvent<HTMLElement>,
        position: string
    ) => {
        setClickedPosition(position);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setClickedPosition("");
    };

    const handleRemovePlayer = (position: string, event: React.MouseEvent) => {
        event.stopPropagation();
        onSelectionClear(position);
    };

    console.log(selectedPlayers);

    const calculateTeamStats = () => {
        const totalBudget = Object.values(selectedPlayers).reduce(
            (sum, player) => sum + (player?.marketValue || 0),
            0
        );

        const totalAge = Object.values(selectedPlayers).reduce(
            (sum, player) => sum + (player?.age || 0),
            0
        );
        const averageAge = Object.keys(selectedPlayers).length
            ? (totalAge / Object.keys(selectedPlayers).length).toFixed(1)
            : 0;

        return { totalBudget, averageAge };
    };

    const validateTeam = () => {
        const newErrors: string[] = [];
        const { totalBudget, averageAge } = calculateTeamStats();

        if (totalBudget < 300 || totalBudget > 700) {
            newErrors.push(
                `Team budget must be between 300M and 700M. Current: ${totalBudget}M`
            );
        }

        if (Number(averageAge) < 25 || Number(averageAge) > 27) {
            newErrors.push(
                `Team average age must be between 25 and 27. Current: ${averageAge}`
            );
        }

        const countryCount: { [key: string]: number } = {};
        const clubCount: { [key: string]: number } = {};

        Object.values(selectedPlayers).forEach((player) => {
            if (player) {
                countryCount[player.nationality] =
                    (countryCount[player.nationality] || 0) + 1;
                clubCount[player.club] = (clubCount[player.club] || 0) + 1;
            }
        });

        Object.entries(countryCount).forEach(([country, count]) => {
            if (count > 2) {
                newErrors.push(
                    `Maximum 2 players allowed from ${country}. Current: ${count}`
                );
            }
        });

        Object.entries(clubCount).forEach(([club, count]) => {
            if (count > 2) {
                newErrors.push(
                    `Maximum 2 players allowed from ${club}. Current: ${count}`
                );
            }
        });

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    console.log(errors);

    return (
        <>
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
                <PlayerDetailsDrawer
                    player={selectedPlayer}
                    open={!!selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                />
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

                <PlayerSelection
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    playerType={getPlayerType(clickedPosition)}
                    onSelectPlayer={(player) =>
                        onSelectionChange(clickedPosition, player)
                    }
                />

                {Object.entries(formationPositions).map(([key, position]) => {
                    const player = selectedPlayers[key];
                    return (
                        <Box
                            key={key}
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
                                        onClick={() =>
                                            setSelectedPlayer(player)
                                        }
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <Typography
                                        onClick={(e) =>
                                            handlePositionClick(e, key)
                                        }
                                        variant="body2"
                                        sx={{
                                            color: "#000",
                                            fontWeight: "bold",
                                            height: "100%",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        {position.label}
                                    </Typography>
                                )}
                                {player && (
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: -3,
                                            right: -1,
                                            backgroundColor: "white",
                                            padding: "1px",
                                            "&:hover": {
                                                backgroundColor: "#e0e0e0",
                                            },
                                        }}
                                        onClick={(e) =>
                                            handleRemovePlayer(key, e)
                                        }
                                    >
                                        <Close fontSize="small" />
                                    </IconButton>
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
            <Button onClick={validateTeam}>Validate</Button>
        </>
    );
}
