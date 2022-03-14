import classNames from "classnames";
import { useState } from "react";
import LoginPage from "./components/auth/LoginPage/LoginPage";
import NewTweetPage from "./components/tweets/new-tweet-page/NewTweetPage";
import  TweetsPage  from "./components/tweets/tweets-page/TweetsPage";
import {Routes, Route, Navigate} from 'react-router-dom'
import TweetPage from "./components/tweets/tweet-page/TweetPage";
import RequireAuth from "./components/auth/RequireAuth";
import AuthContext, { AuthContextProvider } from "./components/auth/context";
import Layout from "./components/layout/Layout";

function App({isInitiallyLogged}) {
  const container = false;
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);
  const handleLogin = ()=> setIsLogged(true);
  const handleLogout = () => setIsLogged(false);
  return (
    // <div className={`App ${container ? 'container': ''}`}>
    <div className={classNames('App', {container}, 'wrapper', ['1','2','3'])}>
      <AuthContextProvider value={{isLogged, handleLogin, handleLogout}}>
          <Routes> {/**2º paso: Añadir el envoltorio de rutas */}
          {/**3er paso: Añadir las rutas  sus componentes a renderizar */}
          {/* La primera ruta raíz "/" hacemos que navegue a "/tweets" */}
            <Route path="/" element={<Navigate to="/tweets"/>}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/tweets" element={<Layout />}> 
                <Route index element={<TweetsPage   id="page" />}/>
                <Route path="/tweets/:tweetId" element={
                  <TweetPage  />
                  }/>
                <Route path="/tweets/new" element={
                    <RequireAuth>
                      <NewTweetPage  />{/**su children es el componente NewTweetpage */}
                    </RequireAuth>}
                 />
            </Route>
            {/* Ruta con parámetro tweetId */}
            
            <Route path="/404" element={<div> 404 | Not Found Page </div>}/>
            {/* Cualquier otra ruta hacemos que navegue a la de 404 */}
            <Route path="*" element={<Navigate to="/404"/>}/>
          </Routes>
          {/* <TweetsPage id="page"/>
          <NewTweetPage/> */}
          {/* {isLogged ? <TweetsPage isLogged={isLogged} id="page" onLogout={handleLogout}/> :  <LoginPage onLogin={handleLogin}/>} */}
      </AuthContextProvider>
        
    </div>
    
  );
}

export default App;
