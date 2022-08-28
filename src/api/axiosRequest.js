import axios from 'axios';

const axiosRequest = async (url, requestMethod, data) => {
    try {
        if (requestMethod === 'get' || requestMethod === 'delete') {
            const res = await axios({ url, method: requestMethod === 'delete' ? 'DELETE' : 'GET' });
            if (res.data.error) return { data: null, error: res.data.error, status: 400 }
            return { data: res.data, status: res.status, error: null };
        }

        else if (requestMethod === 'post' || requestMethod === 'put') {
            const res = await axios({ url, method: requestMethod === 'post' ? 'POST' : 'PUT', data });
            if (res.data.error) return { data: null, error: res.data.error, status: 400 }
            return { data: res.data, status: res.status, error: null };
        }


        return { data: null, status: 400, error: 'Bad Request' };
    } catch (error) {
        console.log(error);
        return { data: null, status: 500, error: 'Server Error' };
    }
};


export default axiosRequest;