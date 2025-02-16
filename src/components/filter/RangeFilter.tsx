// RangeFilter.tsx
import { Slider, Typography, Box } from "@mui/material";
import { useState } from "react";

interface RangeFilterProps {
    label: string;
    value: number[];
    min: number;
    max: number;
    onChange: (value: number[]) => void;
}

export default function RangeFilter({
    label,
    value,
    min,
    max,
    onChange,
}: RangeFilterProps) {
    const [localValue, setLocalValue] = useState(value);

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
                {label}
            </Typography>

            <Slider
                value={localValue}
                onChange={(_, newValue) => setLocalValue(newValue as number[])}
                onChangeCommitted={(_, newValue) =>
                    onChange(newValue as number[])
                }
                valueLabelDisplay="auto"
                min={min}
                max={max}
                sx={{
                    color: "primary.main",
                    height: 6,
                    "& .MuiSlider-thumb": {
                        width: 16,
                        height: 16,
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:hover, &.Mui-focusVisible": {
                            boxShadow: "0 0 0 8px rgba(25, 118, 210, 0.16)",
                        },
                        "&.Mui-active": {
                            width: 20,
                            height: 20,
                        },
                    },
                    "& .MuiSlider-track": {
                        height: 4,
                        border: "none",
                    },
                    "& .MuiSlider-rail": {
                        height: 4,
                        opacity: 0.5,
                        backgroundColor: "grey.300",
                    },
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 0.5,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                }}
            >
                <Typography fontSize="12px">{localValue[0]}</Typography>
                <Typography fontSize="12px">{localValue[1]}</Typography>
            </Box>
        </Box>
    );
}
