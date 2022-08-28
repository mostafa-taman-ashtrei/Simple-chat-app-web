import axiosRequest from "./axiosRequest";

export const fetchAuthData = async () => {
    const res = await axiosRequest('me', 'get');
    return { data: res.data, status: res.status, error: res.error };
};

export const logUserOut = async () => {
    const res = await axiosRequest('logout', 'get');
    return { data: res.data, status: res.status, error: res.error };
}