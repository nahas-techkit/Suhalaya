import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Trips from "./scenes/Trip";
import CreateTrip from "./scenes/Trip/CreateTrip";
import Drivers from "./scenes/Drivers";

import Form from "./components/ComapnyMagt/ComapnyForm";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import AuthGuard from "./guards/AuthGuard";
import { Toaster } from "react-hot-toast";
import ViewCompany from "./components/ComapnyMagt/ViewCompany";
import ViewDriver from "./components/DriverMagt/View"
import AddDriver from "./components/DriverMagt/DriverForm"
import Print from "./components/TripMagt/Print"
import DashBoardLayout from "./layouts/dashboard"
import TripStatus from "./scenes/Trip/TripStatus";
import Company from './scenes/Company'
import Dashboard from './scenes/dashboard'


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Toaster position="top-center" reverseOrder={false} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">

          {/* <Sidebar isSidebar={isSidebar} /> */}
          {/* <main className="content"> */}
          {/* <Topbar setIsSidebar={setIsSidebar} /> */}
          <Routes>
            <Route path="/" element={<AuthGuard><DashBoardLayout /></AuthGuard>}>
              <Route path="/" element={<Dashboard />} index />
              <Route path="/comapnies" element={<Company />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/trips" >
                <Route index element={<Trips />} />
                <Route path="print/:id" element={<Print />} />
                <Route path="create" element={<CreateTrip />} />
                <Route path="edit/:id" element={<CreateTrip />} />
              </Route>
              <Route path="/company/view/:id" element={<ViewCompany />} />
              <Route path="/company/add-comapny" element={<Form />} />
              <Route path="/driver/view/:id" element={<ViewDriver />} />
              <Route path="/driver/add-driver" element={<AddDriver />} />
            </Route>
            <Route path="/trip/status/:id" element={
              <> <main className="content"><Topbar /> <TripStatus /></main></>} />          </Routes>
          {/* </main> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
