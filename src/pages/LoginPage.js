import React, { useState } from "react";
import { Grid, Paper, Box, Typography, Divider, Link } from '@mui/material';
import PageBox from "../components/general/PageBox";
import SignupForm from "../components/auth/SignupForm";
import SigninForm from "../components/auth/SigninForm";


const LoginPage = () => {
    const [mode, setMode] = useState('Sign Up');

    return <PageBox title="Sign In">
        <Grid container>
            <Grid item xs={false} md={8} sm={4}
                sx={{
                    height: '100vh',
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={1}>

                <Box
                    sx={{
                        my: 1,
                        mx: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h4" gutterBottom textAlign="center">
                        {mode === 'Sign Up' ? 'Sign Up' : 'Sign In '}
                    </Typography>

                    {mode === 'Sign In' ?
                        <>
                            <SigninForm />
                            <Divider sx={{ my: 1 }} />



                            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                                Don’t have an account?&nbsp;
                                <Link variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => setMode('Sign Up')}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </>
                        : <>
                            <SignupForm />
                            <Divider sx={{ my: 1 }} />



                            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                                Already have an account?&nbsp;
                                <Link variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => setMode('Sign In')}>
                                    Sign In
                                </Link>
                            </Typography>
                        </>
                    }
                </Box>

            </Grid>
        </Grid>
    </PageBox>

}

export default LoginPage;
