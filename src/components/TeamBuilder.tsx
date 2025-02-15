import { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Alert,
} from "@mui/material";
import { Player } from "../hooks/usePlayerData";
import FormationVisualization from "./FormationVisualization";

interface TeamBuilderProps {
    onPlayerSelect: (position: string) => void;
    selectedPlayers: { [key: string]: Player };
}

const ALLOWED_FORMATIONS = ["4-3-3", "4-4-2", "3-4-3", "5-2-3", "5-3-2"];

export default function TeamBuilder({
    onPlayerSelect,
    selectedPlayers,
}: TeamBuilderProps) {
    const [formation, setFormation] = useState<string>("4-3-3");
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        validateTeam();
    }, [selectedPlayers]);

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

    const handleFormationChange = (value: string) => {
        setFormation(value);
    };

    const { totalBudget, averageAge } = calculateTeamStats();

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Box
                sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Team Statistics
                </Typography>
                <Typography>
                    Total Budget: {totalBudget}M € (300M-700M)
                </Typography>
                <Typography>Average Age: {averageAge} years (25-27)</Typography>
            </Box>

            <FormControl fullWidth>
                <InputLabel>Formation</InputLabel>
                <Select
                    value={formation}
                    label="Formation"
                    onChange={(e) => handleFormationChange(e.target.value)}
                >
                    {ALLOWED_FORMATIONS.map((f) => (
                        <MenuItem key={f} value={f}>
                            {f}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {errors.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    {errors.map((error, index) => (
                        <Alert key={index} severity="error" sx={{ mb: 1 }}>
                            {error}
                        </Alert>
                    ))}
                </Box>
            )}

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Selected Formation: {formation}
                </Typography>
                <FormationVisualization
                    formation={formation}
                    selectedPlayers={selectedPlayers}
                    onPositionClick={onPlayerSelect}
                />
            </Box>
        </Box>
    );
}
