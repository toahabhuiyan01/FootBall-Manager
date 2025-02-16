import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import AlertCentral from "./components/alert/AlertCentral";
import MainContent from "./pages/PlayerList";
import TeamBuilderPage from "./pages/TeamBuilderPage";

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <AlertCentral />
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/team-builder" element={<TeamBuilderPage />} />
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
