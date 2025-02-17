import { Popover, TextField, Box, Autocomplete } from "@mui/material";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import useDebounceFunction from "../../hooks/useDebounce";
import { Player } from "../types";
import { useEffect } from "react";

type Props = {
    onSelectPlayer: (player: Player) => void;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    playerType: string;
};

const PlayerSelection = ({
    anchorEl,
    onClose,
    onSelectPlayer,
    playerType,
}: Props) => {
    const { players, loading, onQsChange, setFilters } = useFetchPlayers();

    useEffect(() => {
        setFilters({
            category: playerType,
        });
    }, [playerType]);

    const open = Boolean(anchorEl);

    const setQsDeb = useDebounceFunction(onQsChange, 300);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <Box sx={{ p: 2, width: 300 }}>
                <Autocomplete
                    loading={loading}
                    options={players}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Players"
                            variant="outlined"
                        />
                    )}
                    onChange={(_, value) => {
                        onSelectPlayer(value!);
                        setQsDeb("");
                        onClose();
                    }}
                    onInputChange={(_, newValue) => {
                        console.log(newValue);
                        setQsDeb(newValue);
                    }}
                />
            </Box>
        </Popover>
    );
};

export default PlayerSelection;
