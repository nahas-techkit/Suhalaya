import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "../../utils/axiosInstance"
import toast, { Toaster } from "react-hot-toast"

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values,{resetForm}) => {
    console.log("log");
    console.log(values);
    axios.post('/api/v1/driver', values)
      .then((res) => {
        resetForm()
        toast.success(res.data.message)
      })
      .catch((e) => { console.log(e); toast.error(e.response.data.message) })
  };

  return (
    <Box m="20px">
      <Toaster />
      <Header subtitle="Add New Driver Profile" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 4" }}
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
                label="Vehicle Modele (eg: suv) "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vehicleModel}
                name="vehicleModel"
                error={!!touched.vehicleModel && !!errors.vehicleModel}
                helperText={touched.vehicleModel && errors.vehicleModel}
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
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  licenseNo: "",
  vehicleNo: "",
  vehicleType: "",
  vehicleModel: "",
};

export default Form;
