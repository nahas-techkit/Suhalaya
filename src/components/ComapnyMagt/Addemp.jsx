import { Button, TextField, Box } from "@mui/material";
import * as Yup from 'yup'
import React from "react";
import Header from "../Header";
import { Formik } from "formik";
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Addemp({ handleClose, data }) {
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    // /^\+(?:[0-9]●?){6,14}[0-9]$/
  const { id } = useParams()
  const EmployeeSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    mobile: Yup.string().matches(phoneRegExp, "Mobile number is not a valid number").required("Mobile is required"),
    address: Yup.string().required("Address is required"),
    department: Yup.string().required("Department is required"),
    // designation: Yup.string().required("Designation is required"),
  })
  const handleFormSubmit = (values) => {
    values.companyId = id
    let promise = data
      ? axios.put(`/api/v1/employee/${data._id}`, values)
      : axios.post('/api/v1/employee', values)

    promise.then((res) => {
      toast.success(res.data.message)
      handleClose()
    })
      .catch((e) => {
        toast.error(e.response.data.message)
      })
  }

  return (
    <div>
      <div className="comapny-management">
        <Header title="" subtitle={`${data ? "Edit" : "Add"} Employee`} />
      </div>
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={EmployeeSchema}
        enableReinitialize
        initialValues={{
          name: '', mobile: '',
          email: '', address: "",
          department: "",
          designation: "", ...data
        }}
      >
        {({
          values,
          errors,
          touched,
          getFieldProps,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              width="70%"
              m="0 auto"
              p="5px"
              display="grid"
              gap="30px"
              comp
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
                {...getFieldProps('name')}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile "
                {...getFieldProps('mobile')}
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Email "
                {...getFieldProps('email')}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address "
                {...getFieldProps('address')}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department "
                {...getFieldProps('department')}
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 5" }}
              />
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>)}
      </Formik>
    </div >
  );
}

export default Addemp