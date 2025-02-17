import { Box, Grid, Typography } from "@mui/material";
import CountryClubFilter from "./CountryClubFilter";
import RangeFilter from "./RangeFilter";
import { Country, Filters } from "./types";
import { useFilterData } from "../../hooks/useFilterData";

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: (filters: Partial<Filters>) => void;
    onFilterChangeDebounced: (filters: Partial<Filters>) => void;
}

export default function FilterControls({
    filters,
    onFilterChange,
}: FilterControlsProps) {
    const {
        countries,
        // clubs,
        loadingCountries,
        // loadingClubs,
        setCountryInput,
        // setClubInput,
        setClubs,
    } = useFilterData(filters.country || "");

    const handleFilterChange = (newFilter: Partial<Filters>) => {
        onFilterChange(newFilter);
    };
    const countryConfig = {
        label: "Country",
        options: countries,
        loading: loadingCountries,
        getOptionLabel: (option: Country) => option.name,
        value: countries.find((c) => c.name === filters.country) || null,
        onInputChange: setCountryInput,
        onChange: (newValue: Country | null) => {
            handleFilterChange({ country: newValue?.name || "" });
            setClubs([]);
        },
    };

    // const clubConfig = {
    //     label: "Club",
    //     options: clubs,
    //     loading: loadingClubs,
    //     getOptionLabel: (option: Team) => option.team.name,
    //     value: clubs.find((c) => c.team.name === filters.club) || null,
    //     onInputChange: setClubInput,
    //     onChange: (newValue: Team | null) => {
    //         handleFilterChange({ club: newValue?.team.name || "" });
    //     },
    // };

    return (
        <Box
            sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
            }}
        >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Player Filters
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <CountryClubFilter config={countryConfig} />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                    <CountryClubFilter config={clubConfig} />
                </Grid> */}
                {/* <Grid item xs={12} sm={6} md={3}>
                    <RangeFilter
                        label="Market Value (M€)"
                        value={[
                            filters.marketValue?.min || 0,
                            filters.marketValue?.max || 200,
                        ]}
                        min={0}
                        max={200}
                        onChange={(newValue) =>
                            onFilterChange({
                                marketValue: {
                                    min: newValue[0],
                                    max: newValue[1],
                                },
                            })
                        }
                    />
                </Grid> */}
                <Grid item xs={12} sm={6} md={6}>
                    <RangeFilter
                        label="Age"
                        value={[filters.age?.min || 16, filters.age?.max || 40]}
                        min={16}
                        max={40}
                        onChange={(newValue) =>
                            onFilterChange({
                                age: { min: newValue[0], max: newValue[1] },
                            })
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
