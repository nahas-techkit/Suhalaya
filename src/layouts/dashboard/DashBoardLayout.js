import styled from '@emotion/styled';
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../scenes/global/Sidebar';
import Topbar from '../../scenes/global/Topbar';


// ----------------------------------------------------------------------

export default function DashboardLayout() {

  return (
    <>
      <Sidebar />

       <main className="content" style={{width:'100%'}}>
      <Topbar  />
        <Outlet />
      </main>
    </>
  );
}
