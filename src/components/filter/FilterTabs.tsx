import { Box, Tab, Tabs } from "@mui/material";

interface PlayerFiltersProps {
    selectedTab: number;
    onTabChange: (newValue: number) => void;
}
export default function FilterTabs({
    selectedTab,
    onTabChange,
}: PlayerFiltersProps) {
    return (
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
                value={selectedTab}
                onChange={(_, newValue) => onTabChange(newValue)}
                aria-label="player categories"
                centered
            >
                <Tab label="All Players" />
                <Tab label="Attackers" />
                <Tab label="Midfielders" />
                <Tab label="Defenders" />
                <Tab label="Goalkeepers" />
            </Tabs>
        </Box>
    );
}
