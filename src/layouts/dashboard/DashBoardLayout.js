import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../scenes/global/Sidebar';
import Topbar from '../../scenes/global/Topbar';


// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>

      <Sidebar isCollapsed={openNav} setIsCollapsed={setOpenNav} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, }}
      >
        <Topbar setOpenNav={setOpenNav} />
        <Outlet />
      </Box>
    </>
  );
}
