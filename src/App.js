import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Company from "./scenes/Company";
import Trips from "./scenes/Trip";
import Drivers from "./scenes/Drivers";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Nt from "./components/TripMagt/Nt"
import Print from "./components/TripMagt/Print"
import Sign from "./components/TripMagt/Signpad"
import Login from "./scenes/login/Login";
import Getdriver from "./components/DriverMagt/getdriver"
import AuthGuard from "./guards/AuthGuard";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <AuthGuard>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/comapnies" element={<Company />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/nt" element={<Nt />} />
              <Route path="/print" element={<Print />} />
              <Route path="/sign" element={<Sign />} />

              </Routes>
            </main>
          </AuthGuard>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
