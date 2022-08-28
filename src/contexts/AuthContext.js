import React, { createContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { fetchAuthData } from '../api/auth';



const initialState = {
    isAuth: false,
    user: null,
    loading: true
}

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    console.log({ isAuth, user, loading });

    const checkAuth = async () => {
        try {
            const { data, status } = await fetchAuthData();
            if (status === 500) throw new Error('Could not fetch request data!');
            const { isAuthenticated, user } = data;
            console.log({ data, status })
            setIsAuth(isAuthenticated);
            setUser(user);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { checkAuth(); }, []);


    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuth,
            setUser,
            setIsAuth,
            checkAuth
        }}>
            {
                loading ?
                    <Box textAlign="center">
                        <CircularProgress
                            sx={{ mt: 35 }}
                            thickness={5}
                            size={20}
                        />
                    </Box>
                    :
                    children
            }
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };


