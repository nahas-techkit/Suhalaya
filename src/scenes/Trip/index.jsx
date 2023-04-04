import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Form from "../../components/TripMagt/TripForm";
import { Link as RouterLink } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import moment from "moment";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Invoices = () => {
  const [showForm, setShowForm] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [trips, setTrips] = useState([])
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('/api/v1/trip/' + id, { status: 'cancelled' })
          .then((res) => {
            console.log(res);
            toast.success(res.data.message)
            getTrips()
          })
          .catch((e) => {
            toast.error(e.response.data.message)
            getTrips()
          })
      }
    })
  }
  const columns = [
    { field: "SLNo", headerName: "SL.No" },
    { field: "id", headerName: "ID" },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "driverName",
      headerName: "Driver Name",
      flex: 1,
    },

    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },

    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row }) => (
        moment(row.date).format('DD/MM/YYYY hh:mm a')
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography textTransform={'capitalize'}>
          {row.status}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            LinkComponent={RouterLink}
            to={'edit/' + row.id}
          >View</Button>
          <Button
            onClick={() => handleCancel(row.id)}
            variant='contained'
            color='error'
          >Cancel</Button>
        </Stack>
      )
    },
  ];

  const getTrips = (signal) => {
    axios.get('/api/v1/trip', { signal })
      .then((res) => {
        setTrips(res.data.trip.map((trip, i) => ({ SLNo: i + 1, id: trip._id, ...trip })))
      })
  }

  useEffect(() => {
    const controller = new AbortController()

    getTrips(controller.signal)
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <Box m="20px">
        <div className="comapny-management">
          <Header title="TRIPS" subtitle="Manage the trips" />
          <Stack direction='row' justifyContent={'end'}>
            <Button  variant="contained" LinkComponent={RouterLink} to="create" >Create New Trip</Button>
          </Stack>
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


          <DataGrid checkboxSelection rows={trips} columns={columns} />

        </Box>

      </Box>
    </>

  );
};

export default Invoices;
