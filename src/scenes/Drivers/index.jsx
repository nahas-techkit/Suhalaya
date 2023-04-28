import { Box, Button, Link, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast"
import { Link as RouterLink } from "react-router-dom";
import SimpleConfirm from "../../components/alert/SimpleConfirm";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [drivers, setDrivers] = useState([])
  const [deletDriver, setDeleteDriver] = useState({ show: false, id: null })

  useEffect(() => {
    axios.get('/api/v1/driver').then((res) => {
      console.log(res.data.drivers);
      setDrivers(res.data.drivers?.map(({ _id, ...driver }, i) => ({ slNo: i + 1, id: _id, ...driver })));
    })
  }, [])

  const handleDelete = (id) => {
    setDeleteDriver({show:false,id:null})
    axios.delete(`/api/v1/driver/${id}`)
      .then((res) => {

        toast.success(res.data.message)
        setDrivers(prevDriver => prevDriver.filter((driver) => driver.id !== id))
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      })
  }

  const columns = [
    { field: "slNo", headerName: "SL.No", flex: 0.5, },
    { field: "id", headerName: "ID", flex: 0.5,minWidth:180 },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth:150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth:150,
    },

    {
      field: "contact",
      headerName: "Phone Number",
      minWidth:150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth:150,
      flex: 1,
    },

    {
      field: "zipCode",
      headerName: "Manage",
      flex: 1,
      minWidth: 200,
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

            <Button
              sx={{
                width: "60%",
                m: "0 5px",
                p: "5px",
                display: "flex",
                justifyContent: "center",
                // backgroundColor:colors.redAccent[700],
                borderRadius: "4px"
              }}
              color='error'
              variant="contained"
              onClick={() => setDeleteDriver({ show: true, id })}

            >
              {/* <Typography onclick color={colors.grey[100]} sx={{ ml: "5px" }}> */}
              Delete
              {/* </Typography> */}
            </Button>
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
          <SimpleConfirm title={'Delete driver'}
            message={'Are you sure to delete.'}
            open={deletDriver.show}
            onClose={() => setDeleteDriver({show:false,id:null})}
            onConfirm={() => handleDelete(deletDriver.id)} />
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
                rows={drivers}
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
