import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Drawer, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import useResponsive from "../../hook/useResponsive";
import navConfig from "./config";
import NavSection from "../../layouts/dashboard/nav-section";


const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const isDesktop = useResponsive('up', 'lg');
  const NAV_WIDTH = 280;

  const renderContent = 
  <>
    <Box sx={{my:"30px"}}>

      <Box textAlign="center">
      <Typography variant="h3" color={colors.grey[100]}>
        ADMINS
      </Typography>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "10px 0 0 0" }}
        >
          SUHALAYA
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[500]}>
          Book Your Cab
        </Typography>
      </Box>
    </Box>

    <NavSection data={navConfig} />
  </ >
  return (<Box
    component="nav"
    sx={{
      flexShrink: { lg: 0 },
      width: { lg: NAV_WIDTH },
    }}
  >
    {isDesktop ? (
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: 'background.default',
            borderRightStyle: 'dashed',
          },
        }}
      >
        {renderContent}
      </Drawer>
    ) : (
      <Drawer
        open={isCollapsed}
        onClose={() => setIsCollapsed(false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { bgcolor: 'background.default',width: NAV_WIDTH },
        }}
      >
        {renderContent}
      </Drawer>
    )}
  </Box>)
};

export default Sidebar;
