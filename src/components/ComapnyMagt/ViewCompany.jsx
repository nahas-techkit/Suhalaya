import React from 'react'
import './Style.css'
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from 'react';
import Add from "../../components/ComapnyMagt/Adddept";
import AddEmp from "../../components/ComapnyMagt/Addemp"

function ViewCompany() {
  const [dept, setAdddept] = useState(false);
  const [emp, setAddEmp] = useState(false);
  
  
  return (
    <Box>
      <div className='ViewCompany'>
       <div className="comapny-management">
         <Header title="COMPANIES" subtitle="Managing the companies" />
         
         <div>
           <button className="btn_blue" onClick={()=>setAdddept(true)} >Add Departtment</button><br></br><br></br>
           <button className="btn_blue" onClick={()=>setAddEmp(true)} >Add Employee</button>
         </div>
       </div>

       {dept && <Add/>}
       {emp && <AddEmp/>}
    </div>
    </Box>
  )
}

export default ViewCompany