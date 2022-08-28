import React, { useState } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Stack, TextField, IconButton, InputAdornment, Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Navigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const SigninForm = () => {
    const { checkAuth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [popUpData, setPopUpData] = useState({ show: false, text: '', type: 'success' });

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().min(8).required('Password is required')
    });

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post('signin/', { email: values.email, password: values.password });
                const { status } = res;
                console.log(status, res);
                if (status === 200) {
                    await checkAuth();
                    return <Navigate to="/dashboard" />
                }
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
                        label="email"
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
                        Sign In
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    </>
}

export default SigninForm;
