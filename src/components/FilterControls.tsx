import { Box, TextField, Slider, Typography } from "@mui/material";
import { Filters } from "../hooks/usePlayerData";

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: (filters: Partial<Filters>) => void;
}

export default function FilterControls({
    filters,
    onFilterChange,
}: FilterControlsProps) {
    const handleMarketValueChange = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) {
            onFilterChange({
                marketValue: { min: newValue[0], max: newValue[1] },
            });
        }
    };

    const handleAgeChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            onFilterChange({
                age: { min: newValue[0], max: newValue[1] },
            });
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
            }}
        >
            <TextField
                size="small"
                label="Country"
                value={filters.country || ""}
                onChange={(e) => onFilterChange({ country: e.target.value })}
            />
            <TextField
                size="small"
                label="Club"
                value={filters.club || ""}
                onChange={(e) => onFilterChange({ club: e.target.value })}
            />
            <Box sx={{ minWidth: 200 }}>
                <Typography gutterBottom>Market Value (M€)</Typography>
                <Slider
                    value={[
                        filters.marketValue?.min || 0,
                        filters.marketValue?.max || 200,
                    ]}
                    onChange={handleMarketValueChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={200}
                />
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <Typography gutterBottom>Age</Typography>
                <Slider
                    value={[filters.age?.min || 16, filters.age?.max || 40]}
                    onChange={handleAgeChange}
                    valueLabelDisplay="auto"
                    min={16}
                    max={40}
                />
            </Box>
        </Box>
    );
}
