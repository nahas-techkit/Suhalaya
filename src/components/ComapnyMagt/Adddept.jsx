import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../../components/Header";
import * as Yup from "yup"
import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function AddDept({ handleClose, data }) {
  const { id: companyId } = useParams()
  const DepartmentSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Id is required"),
  })
  const formik = useFormik({
    initialValues: { name: "", code: "", ...data },
    validationSchema: DepartmentSchema,
    onSubmit: (values) => {
      values.companyId = companyId
      let promise = data
      ? axios.put(`/api/v1/department/${data._id}`, values)
      : axios.post('/api/v1/department', values)
      promise.then((res) => {
        toast.success(res.data.message)
        handleClose()
      })
        .catch((e) => {
          toast.error(e.response.data.message)
        })
    }
  })

  const { touched, errors, getFieldProps, handleSubmit } = formik;
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <div className="comapny-management">
          <Header title="" subtitle="Add Department" />
        </div>

        <Box
          // width="40%"
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
            label="Name Of Department "

            {...getFieldProps("name")}
            error={!!touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Department id "
            {...getFieldProps("code")}
            error={!!touched.code && !!errors.code}
            helperText={touched.code && errors.code}
            sx={{ gridColumn: "span 4" }}
          />
          <div>
            <button type='submit' className="btn_blue" >Submit</button>
          </div>
          <Box>
          </Box>
        </Box>
      </Form>
    </FormikProvider >
  );
}

export default AddDept;
