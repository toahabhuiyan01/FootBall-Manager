import {
    Autocomplete,
    TextField,
    CircularProgress,
    Typography,
    Box,
} from "@mui/material";

interface FilterConfig<T> {
    label: string;
    options: T[];
    loading: boolean;
    getOptionLabel: (option: T) => string;
    value: T | null;
    onInputChange: (value: string) => void;
    onChange: (value: T | null) => void;
}

interface CountryClubFilterProps<T> {
    config: FilterConfig<T>;
}

export default function CountryClubFilter<T>({
    config,
}: CountryClubFilterProps<T>) {
    return (
        <Box>
            <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    mb: 1.5,
                }}
            >
                {config.label}
            </Typography>
            <Autocomplete
                size="small"
                options={config.options}
                getOptionLabel={config.getOptionLabel}
                value={config.value}
                onChange={(_, newValue) =>
                    config.onChange(newValue as T | null)
                }
                onInputChange={(_, newInputValue) =>
                    config.onInputChange(newInputValue)
                }
                loading={config.loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={`Search for ${config.label}...`}
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {config.loading && (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    )}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: "background.default",
                            },
                        }}
                    />
                )}
                sx={{ width: "100%" }}
            />
        </Box>
    );
}
