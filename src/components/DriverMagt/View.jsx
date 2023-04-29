import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"



const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams()
  const [driver, setDriver] = useState({})
  const [edit, setEdit] = useState(false)

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address: yup.string().required("required"),
    licenseNo: yup.string().required("required"),
    vehicleNo: yup.string().required("required"),
    vehicleType: yup.string().required("required"),
    vehicleModel: yup.string().required("required"),

  });
  const getDriver = (id) => {
    axios.get(`/api/v1/driver/${id}`)
      .then((res) => {
        setDriver(res.data)
      })
      .catch((e) => {
       
        console.log(e);      })
  }

  useEffect(() => { getDriver(id) }, [id])

  const handleFormSubmit = (values) => {
    axios.put(`/api/v1/driver/${id}`,values)
    .then((res) => {
      setDriver(res.data)
      setEdit(false)
      toast.success('Driver updated successfully')
    })
    .catch((e) => {
      toast.error("Failed to update driver")    
      console.log(e);
    })
  };


  return (
    <>
      <Box>
        <div className='ViewCompany'>
          <div className="comapny-management">
            <Toaster/>
            <Header title="COMPANIES" subtitle="Managing the Drivers" />
            <div>
              <div className='viewcompany-button'>
                <Button onClick={()=>setEdit(true)} style={{ backgroundColor: "green" }} >Edit</Button >
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box m="20px">
        <Header subtitle=" Driver Profile" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={driver}
          validationSchema={checkoutSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            getFieldProps,
            isValid
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  // value={values.firstName}
                  // name="firstName"
                  {...getFieldProps('firstName')}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  disabled={!edit}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                  
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                  disabled={!edit}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                  disabled={!edit}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  disabled={!edit}
                  sx={{ gridColumn: "span 4" }}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                  disabled={!edit}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="License No "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.licenseNo}
                  name="licenseNo"
                  error={!!touched.licenseNo && !!errors.licenseNo}
                  helperText={touched.licenseNo && errors.licenseNo}
                  sx={{ gridColumn: "span 2" }}
                  disabled={!edit}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle No "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleNo}
                  name="vehicleNo"
                  error={!!touched.vehicleNo && !!errors.vehicleNo}
                  helperText={touched.vehicleNo && errors.vehicleNo}
                  sx={{ gridColumn: "span 2" }}
                  disabled={!edit}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle Type (eg: car/ Outo) "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleType}
                  name="vehicleType"
                  error={!!touched.vehicleType && !!errors.vehicleType}
                  helperText={touched.vehicleType && errors.vehicleType}
                  sx={{ gridColumn: "span 2" }}
                  disabled={!edit}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Vehicle Modele (eg: suv) "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vehicleModel}
                  name="vehicleModel"
                  error={!!touched.vehicleModel && !!errors.vehicleModel}
                  helperText={touched.vehicleModel && errors.vehicleModel}
                  disabled={!edit}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    shrink: Boolean(values.firstName),
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" disabled={!edit||!isValid} color="secondary" variant="contained">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;



export default Form;
