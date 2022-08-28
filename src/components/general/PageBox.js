import React, { forwardRef } from 'react';
import { Box, styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const ResponsiveBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        marginTop: 50
    },
}));

const PageBox = forwardRef(({ children, title }) => (
    <ResponsiveBox>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </ResponsiveBox>
));

export default PageBox;