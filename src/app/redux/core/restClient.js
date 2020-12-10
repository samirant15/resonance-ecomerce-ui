import axios from 'axios';

let getToken = async () => {
    try {
        return await localStorage.getItem('token');
    } catch (error) {
        return '';
    }
}

export const request = async (route, method, data = null, params = null) => {
    return axios(
        {
            url: route,
            method: method,
            data: data,
            params: params,
            json: true
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.statusCode) {
                return Promise.reject({ hasError: true, code: error.response.data.error.statusCode, error: error.response });
            } else if (error.request) {
                return Promise.reject({ hasError: true, code: 401, error: error.response });
            }
        })
}

export const authRequest = async (route, method, data = null, params = null) => {
    const token = await getToken();
    return axios(
        {
            url: route,
            method: method,
            data: data,
            params: params,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            json: true
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.statusCode) {
                return Promise.reject({ hasError: true, code: error.response.data.error.statusCode, error: error.response });
            } else if (error.request) {
                return Promise.reject({ hasError: true, code: 401, error: error.response });
            }
        })
}

export const requestWithToken = async (route, method, data = null, params = null, token) => {
    return axios(
        {
            url: route,
            method: method,
            data: data,
            params: params,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            json: true
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.statusCode) {
                return Promise.reject({ hasError: true, code: error.response.data.error.statusCode, error: error.response });
            } else if (error.request) {
                return Promise.reject({ hasError: true, code: 401, error: error.response });
            }
        })
}