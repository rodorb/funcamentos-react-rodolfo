import AxiosClient, { removeAuthorizationheader, setAuthorizationHeader } from "../../api/axiosClient";
import Storage from "../../utils/storage";
const baseUrl = '/auth'
export const login = ({ rememberMe, ...credentials }) => {
    return AxiosClient.post(`${baseUrl}/login`, credentials)
        .then(({ accessToken, ...response }) => {
            setAuthorizationHeader(accessToken); //Lo guardo en el cliente de Axios, y así al loguearme, seteo en todo el cliente de Axios (para todas las peticiones), se setee la cabecera con el token;
            Storage.set('auth', accessToken);
        });
};

// devolver una promesa que ejecuta funciones para quitar el token de la cabecera
//y del localstorage
export const logout = () => {
    return Promise.resolve().then(() => {
        removeAuthorizationheader();
        Storage.remove('auth');
    });
}