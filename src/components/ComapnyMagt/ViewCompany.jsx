import React from 'react'
import './Style.css'
import Header from "../../components/Header";
import { Box, TextField, Typography, Modal, Button, useTheme } from "@mui/material";
import { useState } from 'react';
import Add from "../../components/ComapnyMagt/Adddept";
import AddEmp from "../../components/ComapnyMagt/Addemp"
import View from "../../components/ComapnyMagt/View"
import { Link } from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#455a64',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ViewCompany() {
  const [dept, setAdddept] = useState(false);
  const [emp, setAddEmp] = useState(false);

  // add department
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

// add  employee
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosee = () => setOpenn(false);


  return (
    <>

      <Box>
        <div className='ViewCompany'>
          <div className="comapny-management">
            <Header title="COMPANIES" subtitle="Managing the companies" />

            <div>
              <div className='viewcompany-button'>
                <button style={{backgroundColor: "green"}} >Edit</button >
                
                {/* <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link> */}
                    
                <button className="btn_blue"  onClick={handleOpen}>Add Departtment</button >
                <button className="btn_blue" onClick={handleOpenn}>Add Employee</button>
              </div>             
            </div>
          </div>
          {dept && <Add />}
          {emp && <AddEmp />}
        </div>
      </Box>
      <div className='company details'>
        <View />
      </div>
 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <div>
            <div className="comapny-management">
              <Header title="" subtitle="Add Department" />
            </div>
            <Box
              width="70%"
              m="0 auto"
              p="5px"
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              // display="flex"
              justifyContent="center"
              // backgroundColor={colors.greenAccent[700]}
              borderRadius="4px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name Of Departent "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department id "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <div>
                <button className="btn_blue" >Sumbmit</button>
              </div>
              <Box>
              </Box>
            </Box>
          </div>
        </Box>
      </Modal>



      {/* add employee */}
 
      <Modal
        open={openn}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <div>
            <div className="comapny-management">
              <Header title="" subtitle="Add Employee" />
            </div>
            <Box
              width="70%"
              m="0 auto"
              p="5px"
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              // display="flex"
              justifyContent="center"
              // backgroundColor={colors.greenAccent[700]}
              borderRadius="4px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name  "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 5" }}
              />
              <div>
                <button className="btn_blue" >Sumbmit</button>
              </div>
              <Box>
              </Box>
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ViewCompany