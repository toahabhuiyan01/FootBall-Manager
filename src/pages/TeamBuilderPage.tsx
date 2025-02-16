import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FormationSelection from "../components/team_builder/FormationSelection";
import FormationVisualization from "../components/team_builder/FormationVisualization";
import { Player } from "../components/types";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TeamBuilderPage() {
    const navigate = useNavigate();
    const [formation, setFormation] = useState("4-3-3");
    const [showVisualization, setShowVisualization] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState<{
        [key: string]: Player;
    }>({});

    const handleFormationChange = (newFormation: string) => {
        setFormation(newFormation);
    };

    const handleNext = () => {
        setShowVisualization(true);
    };

    const handleSelectionChange = (position: string, player: Player) => {
        setSelectedPlayers((prevPlayers) => ({
            ...prevPlayers,
            [position]: player,
        }));
    };

    const handleSelectionClear = (position: string) => {
        setSelectedPlayers((prevPlayers) => {
            const newPlayers = { ...prevPlayers };
            delete newPlayers[position];
            return newPlayers;
        });
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1200px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Button
                sx={{ width: "10rem" }}
                onClick={() => navigate("/")}
                variant="outlined"
                startIcon={<ArrowBack />}
            >
                List Page
            </Button>
            {!showVisualization ? (
                <FormationSelection
                    formation={formation}
                    onFormationChange={handleFormationChange}
                    onNext={handleNext}
                />
            ) : (
                <>
                    <Typography variant="h5">
                        Select players for each position:
                    </Typography>
                    <FormationVisualization
                        formation={formation}
                        selectedPlayers={selectedPlayers}
                        onSelectionChange={handleSelectionChange}
                        onSelectionClear={handleSelectionClear}
                    />
                </>
            )}
        </Box>
    );
}
