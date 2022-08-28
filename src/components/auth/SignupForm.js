import React, { useState } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Stack, TextField, IconButton, InputAdornment, Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [popUpData, setPopUpData] = useState({ show: false, text: '', type: 'success' });

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(8).required('Password is required')
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('signup/', { email: values.email, name: values.name, password: values.password });
        const { status } = res;

        if (status === 200) return setPopUpData({ show: true, type: 'success', text: 'You have successfully created an account.' });
      } catch (error) {
        const errorMessage = error.response.data.error
        console.log(error);
        return setPopUpData({ show: true, type: 'error', text: errorMessage });
      }

    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return <>
    {
      popUpData.show && <Alert severity={popUpData.type} sx={{ m: 2 }}>
        <AlertTitle>{popUpData.type}</AlertTitle>
        {popUpData.text}
      </Alert>
    }


    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={1} alignItems="center" justifyContent="center">
          <TextField
            fullWidth
            size="small"
            label="First name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            size="small"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            size="small"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="medium" type="submit" sx={{ boxShadow: 'none' }} variant="contained" loading={isSubmitting}>
            Sign Up
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  </>
}

export default SignupForm;
