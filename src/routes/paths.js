import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loadable from './Loadable';
import AuthGuard from '../guards/AuthGuard';
import MainLayout from '../layouts/MainLayout';


// IMPORT COMPONENTS
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

const appRoutes = [
    {
        path: '*',
        element: <Outlet />,
        children: [
            { path: '404', element: <NotFound /> },
            { path: '*', element: <Navigate to="/404" replace /> }
        ]
    },
    {
        path: '/',
        element: <AuthGuard><MainLayout /></AuthGuard>,
    },
    {
        path: '/login',
        element: <AuthGuard><MainLayout /></AuthGuard>,
        children: [{ element: <LoginPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
];


export default appRoutes;
