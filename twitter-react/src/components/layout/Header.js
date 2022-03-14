import Button from "../common/Button";
import './Header.css';
import classNames from 'classnames';
// import logo from '../../assets/twitter.svg'
//create-react-app me permite importar el svg como component para usarlo 
//en el template como TwitterIcon (nombre que le pongo yo), solo con svg
//ya que un svg es un elemento
import {ReactComponent as TwitterIcon} from '../../assets/twitter.svg'
import { Link, NavLink } from "react-router-dom";
import AuthButton from "../auth/AuthButton";
function Header({ className }) {


  
    return (
      <header className={classNames('header', className)}>

        <Link to="/">
          <div className="header-logo">
            {/* <img src={logo} alt="Twitter-React"></img> */}
            <TwitterIcon width="32" height="32" />
          </div>
        </Link>
        
        <nav className="header-nav">
          <NavLink to="/tweets/new" className={({isActive})=> isActive? 'active': ''} >New Tweet</NavLink>
          <NavLink to="/tweets" className={({isActive})=>isActive? 'active': ''} end>Tweets</NavLink>

          {/* {isLogged? (
            <Button className="header-button" onClick={handleLogoutClick}>
              Logout
            </Button>
          ):(
            <Button variant="primary" className="header-button">
              Login
            </Button>
          )
          } */}

          <AuthButton className=""/>
          
        </nav>
      </header>
    );
  }
export default Header;