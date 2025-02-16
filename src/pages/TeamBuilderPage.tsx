import { useState } from "react";
import { Box, Button } from "@mui/material";
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

    const handlePositionClick = (position: string) => {
        console.log("Position clicked:", position);
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
                <FormationVisualization
                    formation={formation}
                    selectedPlayers={selectedPlayers}
                    onPositionClick={handlePositionClick}
                />
            )}
        </Box>
    );
}
