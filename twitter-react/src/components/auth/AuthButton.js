import Button from "../common/Button";
import { logout } from "./serviceAuth";
import AuthContext from "./context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function AuthButton({className}){
    const {isLogged, handleLogout:onLogout } =  useContext(AuthContext);
    const handleLogoutClick = async ()=> {
        await logout();
        onLogout();
      }
    return (
        isLogged? (
        <Button className={className} onClick={handleLogoutClick}>
          Logout
        </Button>
      ):(
          <Button as={Link} to="/login" variant="primary" className={className}>
            Login
          </Button>
        
      )
      )
    
}

export default AuthButton;