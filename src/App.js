import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
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
          <AuthGuard>
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/comapnies" element={<Team />} />
                <Route path="/drivers" element={<Contacts />} />
                <Route path="/trips" element={<Invoices />} />
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
                <Route path="/login" element={<Login />} />
                <Route path="/getdriver" element={<Getdriver />} />

              </Routes>
            </main>
          </AuthGuard>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
