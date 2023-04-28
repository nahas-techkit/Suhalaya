import React from "react";
import Topbar from "../../scenes/global/Topbar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

function SimpleLayout({ children }) {
  return (
    <main className="content">
      <Topbar />
      <Container>
        <Outlet />
      </Container>
    </main>
  );
}

export default SimpleLayout;
