import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";

interface FormationSelectionProps {
    formation: string;
    onFormationChange: (formation: string) => void;
    onNext: () => void;
}

const ALLOWED_FORMATIONS = ["4-3-3", "4-4-2", "3-4-3", "5-2-3", "5-3-2"];

export default function FormationSelection({
    formation,
    onFormationChange,
    onNext,
}: FormationSelectionProps) {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h4" gutterBottom>
                Select Formation
            </Typography>
            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Formation</InputLabel>
                <Select
                    value={formation}
                    label="Formation"
                    onChange={(e) => onFormationChange(e.target.value)}
                >
                    {ALLOWED_FORMATIONS.map((f) => (
                        <MenuItem key={f} value={f}>
                            {f}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onNext}
                fullWidth
            >
                Next
            </Button>
        </Box>
    );
}
