import { Box, Tab, Tabs, Container, Divider } from "@mui/material";
import FilterControls from "./FilterControls";
import { Filters } from "../hooks/usePlayerData";

interface PlayerFiltersProps {
    selectedTab: number;
    filters: Filters;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
    onFilterChange: (filters: Partial<Filters>) => void;
}

export default function PlayerFilters({
    selectedTab,
    filters,
    onTabChange,
    onFilterChange,
}: PlayerFiltersProps) {
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs
                    value={selectedTab}
                    onChange={onTabChange}
                    aria-label="player categories"
                    centered
                >
                    <Tab label="All Players" />
                    <Tab label="Forwards" />
                    <Tab label="Midfielders" />
                    <Tab label="Defenders" />
                    <Tab label="Goalkeepers" />
                </Tabs>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <FilterControls
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
                <Divider sx={{ my: 2 }} />
            </Container>
        </>
    );
}
