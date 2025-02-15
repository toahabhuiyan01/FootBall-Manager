import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                >
                    <SportsSoccerIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 0, mr: 4 }}
                >
                    Football Manager
                </Typography>
                <TextField
                    size="small"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{
                        flexGrow: 1,
                        mr: 2,
                        "& .MuiInputBase-root": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.25)",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
                    Create Team
                </Button>
            </Toolbar>
        </AppBar>
    );
}
