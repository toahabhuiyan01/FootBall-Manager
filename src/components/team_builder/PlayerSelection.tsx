import { Popover, TextField, Box, Autocomplete } from "@mui/material";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import useDebounceFunction from "../../hooks/useDebounce";
import { Player } from "../types";
import { useEffect, useMemo } from "react";

type Props = {
    onSelectPlayer: (player: Player) => void;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    playerType: string;
    selecterPlayers: { [_: number]: boolean };
};

const PlayerSelection = ({
    anchorEl,
    onClose,
    onSelectPlayer,
    playerType,
    selecterPlayers,
}: Props) => {
    const { players, loading, onQsChange, setFilters } = useFetchPlayers();
    const filteredPlayers = useMemo(() => {
        const filtered = players.filter((p) => !selecterPlayers[p.id]);

        return filtered;
    }, [players, selecterPlayers]);

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
                    options={filteredPlayers}
                    getOptionLabel={(option) =>
                        `${option.name} - ${option.nationality ?? "N/A"} - ${
                            option.age ? `${option.age} years` : "N/A"
                        }`
                    }
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
                        setQsDeb(newValue);
                    }}
                />
            </Box>
        </Popover>
    );
};

export default PlayerSelection;
