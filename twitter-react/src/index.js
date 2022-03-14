import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Storage from './utils/storage';
import { setAuthorizationHeader } from './api/axiosClient';
import { BrowserRouter as Router } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
console.log(process.env.REACT_APP_API_BASE_URL);

const accessToken = Storage.get('auth');

//Esto haría falta??? ya se setea el header al hacer el login en el servicio de login
setAuthorizationHeader(accessToken); //Lo guardo en el cliente de Axios, y así al loguearme, seteo en todo el cliente de Axios (para todas las peticiones), se setee la cabecera con el token;

ReactDOM.render(
  <React.StrictMode>
    <Router>    {/** paso 1: Englobo toda la aplicación en BrowserRouter para que en toda la aplicación se pueda usar el enrutado de React */}
      <App isInitiallyLogged={!!accessToken}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
