import {
    Box,
    Autocomplete,
    TextField,
    Slider,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Filters } from "../hooks/usePlayerData";
import { useFilterData } from "../hooks/useFilterData";

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: (filters: Partial<Filters>) => void;
}

export default function FilterControls({
    filters,
    onFilterChange,
}: FilterControlsProps) {
    const {
        countries,
        clubs,
        loadingCountries,
        loadingClubs,
        setCountryInput,
        setClubInput,
        setClubs,
    } = useFilterData(filters.country || "");

    const handleMarketValueChange = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            onFilterChange({
                marketValue: { min: newValue[0], max: newValue[1] },
            });
        }
    };

    const handleAgeChange = (newValue: number | number[]) => {
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
            <Autocomplete
                size="small"
                options={countries}
                getOptionLabel={(option) => option.name}
                value={
                    countries.find(
                        (country) => country.name === filters.country
                    ) || null
                }
                onChange={(_, newValue) => {
                    onFilterChange({ country: newValue?.name || "" });
                    setClubs([]); // Reset clubs when country changes
                }}
                onInputChange={(_, newInputValue) => {
                    setCountryInput(newInputValue);
                }}
                loading={loadingCountries}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Country"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loadingCountries ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                sx={{ minWidth: 200 }}
            />
            <Autocomplete
                size="small"
                options={clubs}
                getOptionLabel={(option) => option.team.name}
                value={
                    clubs.find((club) => club.team.name === filters.club) ||
                    null
                }
                onChange={(_, newValue) => {
                    onFilterChange({ club: newValue?.team.name || "" });
                }}
                onInputChange={(_, newInputValue) => {
                    setClubInput(newInputValue);
                }}
                loading={loadingClubs}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Club"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loadingClubs ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                sx={{ minWidth: 200 }}
            />
            <Box sx={{ minWidth: 200 }}>
                <Typography gutterBottom>Market Value (M€)</Typography>
                <Slider
                    value={[
                        filters.marketValue?.min || 0,
                        filters.marketValue?.max || 200,
                    ]}
                    onChange={(_, newValue) =>
                        handleMarketValueChange(newValue)
                    }
                    valueLabelDisplay="auto"
                    min={0}
                    max={200}
                />
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <Typography gutterBottom>Age</Typography>
                <Slider
                    value={[filters.age?.min || 16, filters.age?.max || 40]}
                    onChange={(_, newValue) => handleAgeChange(newValue)}
                    valueLabelDisplay="auto"
                    min={16}
                    max={40}
                />
            </Box>
        </Box>
    );
}
