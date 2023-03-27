import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { Link as RouterLink, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import LoadingButton from '@mui/lab/LoadingButton';
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { googleApiKey } from "../../constant/defaultValues";

const Form = () => {
  const { id } = useParams()
  const [tester, setTester] = useState("")
  const [drivers, setDrivers] = useState([])
  const [trip, setTrip] = useState()
  const [editable, setEditable] = useState(!Boolean(id))
  const initialValues = {
    pickupLocation: "",
    to: "",
    customerName: "",
    customerPhone: "",
    driver: undefined,
    vehicleNo: "",
    vehicleType: tester,
    driverPhone: "",
    date: "",
    time: "",
    extraLocation: '',
    vehicleModel: '',
    tripType: "Airport Transport",
    cost: 0
  };


  const isNonMobile = useMediaQuery("(min-width:600px)");

  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      values.driverName = `${values.driver.firstName} ${values.driver.lastName}`
      values.driverId = values.driver._id
      const formatString = 'YYYY-MM-DD HH:mm:ss';

      const datetimeString = `${values.date} ${values.time}`;

      const datetime = moment(datetimeString, formatString).toDate();
      let data = { ...values, date: datetime }
      let promise = id
        ? axios.put(`/api/v1/trip/${id}`, data)
        : axios.post('/api/v1/trip', data)

      await promise.then((res) => {
        !id && resetForm()
        id && setEditable(false)
        toast.success(res.data.message)
      }).catch((e) => {
        toast.error(e.response.data.message)
      })


    },
    initialValues: { ...initialValues, ...trip },
    validationSchema: checkoutSchema,
    enableReinitialize: true
  })
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    isSubmitting
  } = formik
  const getDrivers = (signal) => {
    axios.get('/api/v1/driver', { signal }).then((res) => {
      setDrivers(res.data.drivers)
    })
  }
  const getTrip = (id, signal) => {
    axios.get(`/api/v1/trip/${id}`, { signal })
      .then((res) => {
        let dateTime = moment(res.data.date)
        const date = dateTime.format('YYYY-MM-DD');
        const time = dateTime.format('HH:mm:ss');
        setTrip({ ...res.data, date, time })
      })
  }
  useEffect(() => {
    const driverId = trip?.driverId
    const driver = drivers.find((driver) => driver._id === driverId)
    console.log(driver, 'driver');
    setFieldValue('driver', driver)
  }, [drivers, trip?.driverId])

  useEffect(() => {
    let controller = new AbortController()
    getDrivers(controller.signal)

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    let controller = new AbortController()
    getTrip(id, controller.signal)

    return () => {
      controller.abort()
    }
  }, [id])


  return (
    <Box m="20px">
      <Header subtitle={`${id ? "View" : "Create new"} Trip`} />
      {id ? <Stack direction={'row'} spacing={2} justifyContent='end'>
        <Button
          variant="contained"
          color='secondary'
          onClick={() => setEditable(true)}
        >Edit</Button>
        <Button
          variant="contained"
          color='secondary'
          LinkComponent={RouterLink}
          to={`/trips/print/${id}`}
        >Trip Sheet</Button>
      </Stack> : <></>}
      <Toaster />
      <FormikProvider value={formik}>
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
              error={!!touched.pickupLocation && !!errors.pickupLocation}
              helperText={touched.pickupLocation && errors.pickupLocation}
              InputProps={{
                inputComponent: ReactGoogleAutocomplete,
                inputProps: {
                  apiKey: googleApiKey,
                  onPlaceSelected: place => {
                    setFieldValue('pickupLocation', place.formatted_address);
                  },
                  options: {
                    types: ['(regions)']
                  }
                }
              }}
              {...getFieldProps('pickupLocation')}
              sx={{ gridColumn: "span 2" }}
              disabled={!editable}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="To"
              {...getFieldProps('dropLocation')}
              InputProps={{
                inputComponent: ReactGoogleAutocomplete,
                inputProps: {
                  apiKey: googleApiKey,
                  onPlaceSelected: place => {
                    setFieldValue('dropLocation', place.formatted_address);
                  },
                  options: {
                    types: ['(regions)']
                  }
                }
              }}
              error={!!touched.dropLocation && !!errors.dropLocation}
              helperText={touched.dropLocation && errors.dropLocation}
              sx={{ gridColumn: "span 2" }}
              disabled={!editable}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Extra Location"
              {...getFieldProps('extraLocation')}
              InputProps={{
                inputComponent: ReactGoogleAutocomplete,
                inputProps: {
                  apiKey: googleApiKey,
                  onPlaceSelected: place => {
                    setFieldValue('extraLocation', place.formatted_address);
                  },
                  options: {
                    types: ['(regions)']
                  }
                }
              }}
              error={!!touched.extraLocation && !!errors.extraLocation}
              helperText={touched.extraLocation && errors.extraLocation}
              sx={{ gridColumn: "span 2" }}
              disabled={!editable}
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
              disabled={!editable}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.customerPhone}
              name="customerPhone"
              error={!!touched.customerPhone && !!errors.customerPhone}
              helperText={touched.customerPhone && errors.customerPhone}
              sx={{ gridColumn: "span 2" }}
              disabled={!editable}
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
              disabled={!editable}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="time"
              label="Time"
              disabled={!editable}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.time}
              name="time"
              error={!!touched.time && !!errors.time}
              helperText={touched.time && errors.time}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Cost"
              disabled={!editable}
              {...getFieldProps('cost')}
              error={!!touched.cost && !!errors.cost}
              helperText={touched.cost && errors.cost}
              sx={{ gridColumn: "span 2" }}
            />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              // name="radio-buttons-group"
              {...getFieldProps('tripType')}

            >
              <FormControlLabel value="Airport Transport" control={<Radio color="secondary" disabled={!editable} />} label="Airport Transport" />
              <FormControlLabel value="Out station" control={<Radio color="secondary" disabled={!editable} />} label="Out station" />
              <FormControlLabel value="Hourly Based/Package" control={<Radio color="secondary" disabled={!editable} />} label="Hourly Based/Package" />
            </RadioGroup>
            <Typography fullWidth sx={{ gridColumn: "span 4" }}>
              Driver Details
            </Typography>
            {(!id || id && drivers && drivers.length && values?.driver) && <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={drivers}

              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              sx={{ gridColumn: "span 2" }}
              renderInput={(params) => <TextField
                fullWidth
                {...params}
                variant="filled"
                label="Driver"
                error={!!touched.driver && !!errors.driver}
                helperText={touched.driver && errors.driver}
              />}
              {...getFieldProps('driver')}

              onChange={(e, value) => {
                if (!value) return
                setFieldValue("driver", value, true)
                setFieldValue("driverName", `${value.firstName} ${value.lastName}`, true)
                setFieldValue("driverPhone", value.contact, true)
                setFieldValue("vehicleNo", value.vehicleNo, true)
                setFieldValue("vehicleType", value.vehicleType, true)
                setFieldValue("vehicleModel", value.vehicleModel, true)
              }}
              disabled={!editable}
            />}
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
              disabled={!editable}
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
              disabled={!editable}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Vehicle Model (eg: SUV) "
              {...getFieldProps("vehicleModel")}
              error={!!touched.vehicleModel && !!errors.vehicleModel}
              helperText={touched.vehicleModel && errors.vehicleModel}
              sx={{ gridColumn: "span 2" }}
              disabled={!editable}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone NO"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.driverPhone}
              name="driverPhone"
              error={!!touched.driverPhone && !!errors.driverPhone}
              helperText={touched.driverPhone && errors.driverPhone}
              sx={{ gridColumn: "span 2" }}
              disabled={!editable}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <LoadingButton disabled={!editable} loading={isSubmitting} type="submit" color="secondary" variant="contained">
              Submit
            </LoadingButton>
          </Box>
        </form>
      </FormikProvider>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  pickupLocation: yup.string().required("required"),
  dropLocation: yup.string().required("required"),
  customerName: yup.string().required("required"),

  customerPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  driverPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  driver: yup.object().typeError("Please select a driver").required("Please select a driver"),

  vehicleNo: yup.string().required("required"),
  vehicleType: yup.string().required("required"),

  date: yup.date().required("required"),
  time: yup.string().required("required"),
  cost: yup.number().typeError("Cost must be number type").required("Cost is required"),
});

// const initialValues = {
//   from: "",
//   to: "",
//   customerName: "",
//   customerPhone: "",
//   driver: "",
//   vehicleNo: "",
//   vehicleType: {tester},
//   driverPhone: "",
//   date: "",
//   time:""
// };

export default Form;
