import Axios from 'axios';
//crear un cliente con Axios con un basePath que indiquemos (el fqdn vaya)
const AxiosClient = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});


//Añadimos un iterceptor a cada petición http para que solo me devuelve lo que
//hay dentro de data, de lo contrario devuelve todo lo que monte 
//axios en el response http, como el config, headers, request, status, etc...
AxiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.log(error);
        if (!error.response) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject({
            message: error.response.statusText,
            ...error.response,
            ...error.response.data
        })
    }
);


//Función para configurar el cliente de axios con el token automaticamente
export const setAuthorizationHeader = (token) => {
    AxiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const removeAuthorizationheader = () => {
    delete AxiosClient.defaults.headers.common['Authorization'];
}
export default AxiosClient;