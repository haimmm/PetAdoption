import axios from "axios";

axios.defaults.withCredentials = true;

export const setRequest = tokenRef => {
    axios.interceptors.request.use(
        function (config) {
            config.headers['Authorization'] = tokenRef.current;
            return config;
        },
        function (error)  {
            return Promise.reject(error);
        }
    );
}


export const setResponse = refresh => {
    axios.interceptors.response.use((response) => response, 
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("returned error with 401");
            originalRequest._retry = true;
            await refresh();
            console.log("retrying");
            return axios(originalRequest);
        } else return Promise.reject(error);
    });
}



