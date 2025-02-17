interface Position {
    top: string;
    left: string;
    label: string;
}

export type PlayerType = "Attacker" | "Midfielder" | "Defender" | "Goalkeeper";

export function getPlayerType(positionKey: string): PlayerType {
    // Attacking positions
    if (
        positionKey.includes("ST") ||
        positionKey.includes("LW") ||
        positionKey.includes("RW")
    ) {
        return "Attacker";
    }

    // Midfield positions
    if (
        positionKey.includes("CM") ||
        positionKey.includes("LM") ||
        positionKey.includes("RM")
    ) {
        return "Midfielder";
    }

    // Defensive positions including wing-backs
    if (
        positionKey.includes("CB") ||
        positionKey.includes("LB") ||
        positionKey.includes("RB") ||
        positionKey.includes("LWB") ||
        positionKey.includes("RWB")
    ) {
        return "Defender";
    }

    // Goalkeeper position
    if (positionKey.includes("GK")) {
        return "Goalkeeper";
    }

    // Default case (should never happen with current formations)
    return "Midfielder";
}

const formations: { [key: string]: { [key: string]: Position } } = {
    "4-3-3": {
        GK: { top: "85%", left: "50%", label: "GK" },
        LB: { top: "70%", left: "20%", label: "LB" },
        CB1: { top: "70%", left: "40%", label: "CB" },
        CB2: { top: "70%", left: "60%", label: "CB" },
        RB: { top: "70%", left: "80%", label: "RB" },
        CM1: { top: "50%", left: "30%", label: "CM" },
        CM2: { top: "50%", left: "50%", label: "CM" },
        CM3: { top: "50%", left: "70%", label: "CM" },
        LW: { top: "30%", left: "20%", label: "LW" },
        ST: { top: "20%", left: "50%", label: "ST" },
        RW: { top: "30%", left: "80%", label: "RW" },
    },
    "4-4-2": {
        GK: { top: "85%", left: "50%", label: "GK" },
        LB: { top: "70%", left: "20%", label: "LB" },
        CB1: { top: "70%", left: "40%", label: "CB" },
        CB2: { top: "70%", left: "60%", label: "CB" },
        RB: { top: "70%", left: "80%", label: "RB" },
        LM: { top: "45%", left: "20%", label: "LM" },
        CM1: { top: "45%", left: "40%", label: "CM" },
        CM2: { top: "45%", left: "60%", label: "CM" },
        RM: { top: "45%", left: "80%", label: "RM" },
        ST1: { top: "25%", left: "35%", label: "ST" },
        ST2: { top: "25%", left: "65%", label: "ST" },
    },
    "3-4-3": {
        GK: { top: "85%", left: "50%", label: "GK" },
        CB1: { top: "70%", left: "30%", label: "CB" },
        CB2: { top: "70%", left: "50%", label: "CB" },
        CB3: { top: "70%", left: "70%", label: "CB" },
        LM: { top: "45%", left: "20%", label: "LM" },
        CM1: { top: "45%", left: "40%", label: "CM" },
        CM2: { top: "45%", left: "60%", label: "CM" },
        RM: { top: "45%", left: "80%", label: "RM" },
        LW: { top: "25%", left: "25%", label: "LW" },
        ST: { top: "20%", left: "50%", label: "ST" },
        RW: { top: "25%", left: "75%", label: "RW" },
    },
    "5-2-3": {
        GK: { top: "85%", left: "50%", label: "GK" },
        LWB: { top: "65%", left: "15%", label: "LWB" },
        CB1: { top: "70%", left: "35%", label: "CB" },
        CB2: { top: "75%", left: "50%", label: "CB" },
        CB3: { top: "70%", left: "65%", label: "CB" },
        RWB: { top: "65%", left: "85%", label: "RWB" },
        CM1: { top: "45%", left: "40%", label: "CM" },
        CM2: { top: "45%", left: "60%", label: "CM" },
        LW: { top: "25%", left: "25%", label: "LW" },
        ST: { top: "20%", left: "50%", label: "ST" },
        RW: { top: "25%", left: "75%", label: "RW" },
    },
    "5-3-2": {
        GK: { top: "85%", left: "50%", label: "GK" },
        LWB: { top: "65%", left: "15%", label: "LWB" },
        CB1: { top: "70%", left: "35%", label: "CB" },
        CB2: { top: "75%", left: "50%", label: "CB" },
        CB3: { top: "70%", left: "65%", label: "CB" },
        RWB: { top: "65%", left: "85%", label: "RWB" },
        CM1: { top: "45%", left: "35%", label: "CM" },
        CM2: { top: "45%", left: "50%", label: "CM" },
        CM3: { top: "45%", left: "65%", label: "CM" },
        ST1: { top: "25%", left: "35%", label: "ST" },
        ST2: { top: "25%", left: "65%", label: "ST" },
    },
};

export default formations;
