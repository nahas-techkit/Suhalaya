import { Box, Link, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

const Contacts = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const columns = [
    { field: "id", headerName: "Sl.No", flex: 0.5 },
    { field: "_id", headerName: "Id", flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
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
      field: "zipCode",
      headerName: "Menage",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <>
            <Box
              width="60%"
              m="0 5px"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.blueAccent[700]}
              borderRadius="4px"
            >
              <Link component={RouterLink} to={`/driver/view/${id}`}>
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  View
                </Typography>
              </Link>
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
      <>
        <Box m="20px">
          <div className="comapny-management">
            <Header title="DRIVERS" subtitle="Managing the drivers" />
            <div>
              <Link component={RouterLink} to={"/driver/add-driver"}>
                <button>Add New Driver</button>
              </Link>
            </div>
          </div>

          {
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
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <DataGrid
                rows={mockDataContacts}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          }
        </Box>
      </>
    </>
  );
};

export default Contacts;
