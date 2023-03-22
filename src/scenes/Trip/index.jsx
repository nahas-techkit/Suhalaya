import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useState } from "react";
import Form from "../../components/TripMagt/TripForm";

const Invoices = () => {
  const [showForm, setShowForm] = useState(false);  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
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
    },
    {
      field: "email",
      headerName: "Status",
      flex: 1,
    },
     {
      field: "view",
      headerName: "View",
      flex: 1,
      
    },
  ];

  return (
    <>
    <Box m="20px">
       <div className="comapny-management">
        <Header title="TRIPS" subtitle="Managing the trips" />
        <div>
          <button onClick={()=>setShowForm(!showForm)}>Create New Trip</button>
        </div>
      </div>
      {
        showForm ? <div>
          <Form/>
        </div> :<Box
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
  
       
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
        
      </Box>
      }
    </Box>
    <div className='viewcompany-button'>
    <button style={{backgroundColor: "green"}} >Edit</button >
    </div>
    </>
    
  );
};

export default Invoices;
