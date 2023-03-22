import React, { useState, useEffect } from "react";
import { Box, Link, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import "./team.css";

import axios from "../../utils/axiosInstance";
import { Link as RouterLink } from "react-router-dom";

const Team = () => {
  const [data, setdata] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "SlNo", headerName: "Sl.No" },
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

      renderCell: ({ row: { access, id } }) => {
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
              <Link component={RouterLink} to={`/company/view/${id}`}>
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

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    axios.get(`/api/v1/company`).then((res) => {
      console.log("res.data", res.data);

      setdata(
        res.data.companies.map((company, i) => {
          return {
            SlNo: i + 1,
            id: company?._id,
            name: company?.name,
            email: company?.email,
            phone: company?.number,
          };
        })
      );
    });
  }

  return (
    <>
      <>
        <Box m="20px">
          <div className="comapny-management">
            <Header title="COMPANIES" subtitle="Managing the companies" />
            <div>
              <Link component={RouterLink} to={"/company/add-comapny"}>
                <button>Create New Comapny</button>
              </Link>
            </div>
          </div>

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
            <DataGrid checkboxSelection rows={data} columns={columns} />
          </Box>
        </Box>
      </>
    </>
  );
};

export default Team;
