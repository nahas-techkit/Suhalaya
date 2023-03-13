import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";

const Form = () => {
    
    const fun = ()=>{
        console.log("sanu");
        setTester("HAis")
        console.log(tester);
    }
    const [tester, setTester]= useState("")
    const initialValues = {
        from: "",
        to: "",
        customerName: "",
        contact: "",
        driverName: "",
        vehicleNo: "",
        vehicleType: tester,
        contactOfDriver: "",
        date: "",
        time:""
      };
    
    
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log("log");
    console.log(values);
    
   
  };

  return (
    <Box m="20px">
      <Header subtitle="Create new Trip" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
              <Typography fullWidth sx={{ gridColumn: "span 4" }}>
                Customer Details
              </Typography>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="From"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.from}
                name="from"
                error={!!touched.from && !!errors.from}
                helperText={touched.from && errors.from}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="To"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.to}
                name="to"
                error={!!touched.to && !!errors.to}
                helperText={touched.to && errors.to}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Customer Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerName}
                name="customerName"
                error={!!touched.customerName && !!errors.customerName}
                helperText={touched.customerName && errors.customerName}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
               
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Time"
                
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time}
                name="time"
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
                sx={{ gridColumn: "span 2" }}
              />

              <Typography fullWidth sx={{ gridColumn: "span 4" }}>
                Driver Details
              </Typography>

              <Select
                fullWidth
                variant="filled"
                InputLabel="Driver"
                label="Driver"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.driverName}
                name="driverName"
                error={!!touched.driverName && !!errors.driverName}
                helperText={touched.driverName && errors.driverName}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem onClick={fun} value={10}>Nahas</MenuItem>
                <MenuItem value={20}>Fahmil</MenuItem>
                <MenuItem value={30}>Guru</MenuItem>
              </Select>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vehicle NO "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vehicleNo}
                name="vehicleNo"
                error={!!touched.vehicleNo && !!errors.vehicleNo}
                helperText={touched.vehicleNo && errors.vehicleNo}
                sx={{ gridColumn: "span 2" }}
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
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone NO"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactOfDriver}
                name="contactOfDriver"
                error={!!touched.contactOfDriver && !!errors.contactOfDriver}
                helperText={touched.contactOfDriver && errors.contactOfDriver}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  from: yup.string().required("required"),
  to: yup.string().required("required"),
  customerName: yup.string().required("required"),

  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  contactOfDriver: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  driverName: yup.string().required("required"),

  vehicleNo: yup.string().required("required"),
  vehicleType: yup.string().required("required"),

  date: yup.date().required("required"),
  time: yup.string().required("required"),
});

// const initialValues = {
//   from: "",
//   to: "",
//   customerName: "",
//   contact: "",
//   driverName: "",
//   vehicleNo: "",
//   vehicleType: {tester},
//   contactOfDriver: "",
//   date: "",
//   time:""
// };

export default Form;
