import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import "./team.css";
import { useState } from "react";
import Form from "../../components/ComapnyMagt/ComapnyForm";
import ViewCompany from "../../components/ComapnyMagt/ViewCompany";
import Sidebar from "../global/Sidebar";

const Team = () => {
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Company name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Meneage",
      flex: 1,

      renderCell: ({ row: { access } }) => {
        return (
          <>
          <Sidebar/>
          
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[700]}
              borderRadius="4px"
            >
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                Edit
              </Typography>
            </Box>

            <Box
              width="60%"
              m="0 5px"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.blueAccent[700]}
              borderRadius="4px"
            >
              <Typography onClick={()=>setView(true)} color={colors.grey[100]} sx={{ ml: "5px" }}>
                View
              </Typography>
            </Box>

            <Box
              width="60%"
              m="0 5px"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[700]}
              borderRadius="4px"
            >
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                Delete
              </Typography>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <>
    {
      view ?  <ViewCompany/> :  <>
      <Box m="20px">
 
       <div className="comapny-management">
         <Header title="COMPANIES" subtitle="Managing the companies" />
         <div>
           <button onClick={()=>setShowForm(!showForm)}>Create New Comapny</button>
         </div>
       </div>
 
       {showForm ? (
         <div>
           <Form/>
         </div>
       ) : (
         <Box
           m="40px 0 0 0"
           height="75vh"
           sx={{
             "& .MuiDataGrid-root": {
               border: "none",
             },
             "& .MuiDataGrid-cell": {
               borderBottom: "none",
             },
             "& .name-column--cell": {
               color: colors.greenAccent[300],
             },
             "& .MuiDataGrid-columnHeaders": {
               backgroundColor: colors.blueAccent[700],
               borderBottom: "none",
             },
             "& .MuiDataGrid-virtualScroller": {
               backgroundColor: colors.primary[400],
             },
             "& .MuiDataGrid-footerContainer": {
               borderTop: "none",
               backgroundColor: colors.blueAccent[700],
             },
             "& .MuiCheckbox-root": {
               color: `${colors.greenAccent[200]} !important`,
             },
           }}
         >
           <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
         </Box>
       )}
     </Box>
       
      </>
    }
    
    
    </>
  );
};

export default Team;
