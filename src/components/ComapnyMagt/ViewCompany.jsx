import React, { useEffect } from 'react'
import './Style.css'
import Header from "../../components/Header";
import { Box, Modal, Button, useTheme, Stack } from "@mui/material";
import { useState } from 'react';
import Add from "../../components/ComapnyMagt/Adddept";
import AddEmp from "../../components/ComapnyMagt/Addemp"
import View from "../../components/ComapnyMagt/View"
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import Swal from 'sweetalert2'

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
  const [company, setCompany] = useState();
  const { id } = useParams()
  // add department
  const [openDept, setOpenDept] = useState({ show: false, data: null });
  const handleOpen = () => setOpenDept({ show: true });
  const handleClose = () => setOpenDept({ show: false });

  // add  employee
  const [openEmployee, setOpenEmployee] = useState(false);
  const handleOpenn = () => setOpenEmployee(true);
  const handleClosee = () => setOpenEmployee(false);

  useEffect(() => {
    if (openDept.show || openEmployee) return;
    const controller = new AbortController()
    axios.get(`/api/v1/company/${id}`, { signal: controller.signal })
      .then((res) => setCompany(res.data))
    return () => {
      controller.abort()
    }
  }, [id, openDept, openEmployee])
  const deleteDepartment = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/v1/departmet/${id}`).then((res) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }

  return (
    <>

      <Box>
        <div className='ViewCompany'>
          <div className="comapny-management">
            <Header title="COMPANIES" subtitle="Managing the companies" />

            <div>
              <Stack direction='row' spacing={2} justifyContent={'end'}>
                <button className="btn_blue"  >Edit</button >

                {/* <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link> */}

                <button className="btn_blue" onClick={handleOpen}>Add Departtment</button >
                <button className="btn_blue" onClick={handleOpenn}>Add Employee</button>
              </Stack>
            </div>
          </div>
          {dept && <Add />}
          {emp && <AddEmp />}
        </div>
      </Box>
      <div className='company details'>
        <View company={company}
          onEditDep={(data) => {
            setOpenDept({ show: true, data })
          }}
          onDeleteDep={deleteDepartment}
        />
      </div>

      <Modal
        open={openDept.show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <Add handleClose={handleClose} data={openDept.data} />
        </Box>
      </Modal>



      {/* add employee */}

      <Modal
        open={openEmployee}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <AddEmp setOpenEmployee={setOpenEmployee} />
        </Box>
      </Modal>
    </>
  )
}

export default ViewCompany