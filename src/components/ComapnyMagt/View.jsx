import { Box, Button, InputLabel, MenuItem, Select, FormControl, TextField, Grid, List, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import * as React from 'react';
import DepartmentSigle from "./DepartmentSigle";
import EmployeeSigle from "./EmployeeSigle";
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";


const Form = ({ company, onEditDep, onDeleteDep, onEditEmp,isEditable, onDeleteEmp, setEditable }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams()
    const handleFormSubmit = (values) => {
        console.log(values);
        axios.put(`/api/v1/company/${id}`, values)
            .then((res) => {
                setEditable(false)
                toast.success(res.data.message)
            })
            .catch((e) => toast.error(e.response.data.message))
    };
    const [dept, setDept] = React.useState('');
    const [emp, setEmp] = React.useState('');

    return (
        <Box m="20px">
            <Header

                subtitle="Company Details"
            />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={company || {}}
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
                    getFieldProps
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
                                label="Name"
                                {...getFieldProps('name')}
                                InputLabelProps={{
                                    shrink: Boolean(values.name),
                                }}
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                                disabled={!isEditable}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Contact Number"
                                {...getFieldProps('number')}
                                InputLabelProps={{
                                    shrink: Boolean(values.number),
                                }}
                                error={!!touched.number && !!errors.number}
                                helperText={touched.number && errors.number}
                                sx={{ gridColumn: "span 4" }}
                                disabled={!isEditable}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                {...getFieldProps('email')}
                                InputLabelProps={{
                                    shrink: Boolean(values.email),
                                }}
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                                disabled={!isEditable}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button  disabled={!isEditable} type="submit"  variant="contained">
                                Submit
                            </Button>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} >
                                <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
                                    Department
                                </Typography>
                                <List  >
                                    {company?.department?.map((dep) =>
                                        <DepartmentSigle data={dep} onEdit={onEditDep} onDelete={onDeleteDep} />)}
                                </List>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
                                    Employees
                                </Typography>
                                <List >
                                    {company?.employees?.map((employee) => <EmployeeSigle onEdit={onEditEmp} onDelete={onDeleteEmp
                                    } data={employee} />)}
                                </List>
                            </Grid>
                        </Grid>

                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),

    email: yup.string().email("invalid email").required("required"),
    number: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    // address1: yup.string().required("required"),

});
const initialValues = {
    nameOfComapnie: "",
    email: "",
    contact: "",
    address1: "",
};

export default Form;
