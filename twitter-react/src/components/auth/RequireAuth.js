import { Navigate, useLocation } from "react-router-dom"
import { AuthContextConsumer } from "./context";
import T from 'prop-types';

const RequireAuth = ({isLogged, children})=>{
    const location = useLocation();

    if(!isLogged){
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return children;
    
}

RequireAuth.propTypes = {
  isLogged: T.bool,
  childre: T.node,
}


//peta por el comentario de arriba????
// const ConnectedRequireAuth = props=>{
//     <AuthContextConsumer>
//         {/* el parametro es el objeto con el value seteado en el provider 
//         (lo destructuro para solo usar isLogged) */}
//         {({ isLogged }) => <RequireAuth isLogged={isLogged} {...props}/>} {/**Todas las props que se le pase a connectedrequiredAuth se las pasa a RequireAuth */}
//     </AuthContextConsumer>
// }

const ConnectedRequireAuth = props => (
    <AuthContextConsumer>
      {({ isLogged }) => <RequireAuth isLogged={isLogged} {...props} />}
    </AuthContextConsumer>
  );

export default ConnectedRequireAuth;