import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Link, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import "./team.css";

import axios from "../../utils/axiosInstance";
import { Link as RouterLink } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Team = () => {
  const [data, setdata] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "SlNo", headerName: "Sl.No" },
    { field: "id", headerName: "ID", minWidth: 180 },
    {
      field: "name",
      headerName: "Company name",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Manage",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row: { access, _id } }) => {
        return (
          <Stack spacing={2} direction={'row'}>
            <Button
              variant="contained"
              component={RouterLink}
              to={`/company/view/${_id}`}
            >
              View
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </Button>
          </Stack>
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
            id: company?.id || company?._id,
            _id: company?._id,
            name: company?.name,
            email: company?.email,
            phone: company?.number,
          };
        })
      );
    });
  }

  const handleDelete = useCallback(
    (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/api/v1/company/${id}`)
            .then((res) => {
              getdata();
              toast.success(res.data.message);
            })
            .catch((e) => {
              toast.error(e.response.data.message);
            });
        }
      });
    },
    [getdata]
  );
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
