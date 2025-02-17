import { Grid2 as Grid } from "@mui/material";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { green, red } from "@mui/material/colors";
import useAlertStore from "../../store/AlertStore";

function AlertCentral() {
    const { alert, clearAlert } = useAlertStore();

    useEffect(() => {
        if (alert) {
            setTimeout(clearAlert, alert.timeout || 3000);
        }
    }, [alert]);

    if (!alert) return null;

    return (
        <Grid
            px={2}
            direction="column"
            position="absolute"
            borderRadius="xl"
            gap={2}
            sx={{
                width: "fit-content",
                borderRadius: ".5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor:
                    alert.type === "success" ? green[100] : red[100],
                bottom: "2rem",
                right: "1rem",
            }}
            style={{ maxWidth: "calc(100% - 2rem)" }}
        >
            <Grid
                gap={2}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <KeyboardCommandKeyIcon />
                <p>{alert?.message}</p>
            </Grid>
            <CloseIcon style={{ cursor: "pointer" }} onClick={clearAlert} />
        </Grid>
    );
}

export default AlertCentral;
