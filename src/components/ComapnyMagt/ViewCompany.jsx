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
import toast from "react-hot-toast";


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
  const [openEmployee, setOpenEmployee] = useState({ show: false, data: null });
  const handleOpenn = () => setOpenEmployee({ show: true });
  const handleClosee = () => setOpenEmployee({ show: false });

  const [isEditable, setEditable] = useState(false);
  const getCompany = (id, controller) => {
    axios.get(`/api/v1/company/${id}`, { signal: controller?.signal })
      .then((res) => setCompany(res.data))

  }
  useEffect(() => {
    if (openDept.show || openEmployee.show) return;
    const controller = new AbortController()
    getCompany(id, controller)
    return () => {
      controller.abort()
    }
  }, [id, openDept, openEmployee])
  const deleteDepartment = (depId) => {
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
        axios.delete(`/api/v1/department/${depId}`, { params: { companyId: id } }).then((res) => {
          getCompany(id)
          toast.success(res.data.message)
        })
          .catch((e) => {
            toast.error(e.response.data.message)
          })
      }
    })
  }

  const deleteEmployee = (empId) => {
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
        axios.delete(`/api/v1/employee/${empId}`, { params: { companyId: id } }).then((res) => {
          getCompany(id)
          toast.success(res.data.message)
        })
          .catch((e) => {
            toast.error(e.response.data.message)
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
                <button onClick={() => setEditable(true)} className="btn_blue"  >Edit</button >

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
          onEditEmp={(data) => {
            setOpenEmployee({ show: true, data })
          }}
          isEditable={isEditable}
          setEditable={setEditable}
          onDeleteDep={deleteDepartment}
          onDeleteEmp={deleteEmployee}
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
        open={openEmployee.show}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <AddEmp handleClose={handleClosee} data={openEmployee.data} />
        </Box>
      </Modal>
    </>
  )
}

export default ViewCompany