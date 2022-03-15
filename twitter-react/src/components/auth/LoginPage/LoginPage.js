import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../common/Button";
import { login } from "../serviceAuth";
import FormField from '../../common/FormField';
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context";


function LoginPage(){
    const ref = useRef(null);
    // Uso los customs Hooks de React Router
    
    const {handleLogin: onLogin} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    const [isLoading, setIsloading]= useState(false);
    const [error, setError]= useState(null);
    const { username, password, rememberMe } = credentials;
    //USANDO HANDLEINPUT COMO CLOSURE (funcion que devuelve otra funcion)
    // const handleInputChange = (name, eventPropertyChanged)=> ($event)=>{
    //     // const key = $event.target.name;//TIENEN QUE COINCIDIR EL ATRIBUTO NAME del input con la propiedad del objeto con el estado credentials
    //     const newValue = $event.target[eventPropertyChanged];
    //     //si el estado que voy a generar, depende del anterior, mejor pasarle una función
    //     //a la función del seteo del nuevo estado, así tengo el estado anterior
    //     setCredentials((oldCredentialsValue)=>{
    //      return  {
    //         ...oldCredentialsValue,//mantengo la parte que tenia anteriormente
    //         [name]: newValue //sobreescribo solo la parte que interesa
    //         }   
    //     });
    // };

    const handleInputChange = event => {
        setCredentials(credentials => ({
          ...credentials,
          [event.target.name]:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value,
        }));
      };
    const inputsAreEmpty= ()=> !username || !password;
    const resetError = ()=> setError(null);
    const handleSubmit = async ($event)=>{
        $event.preventDefault();
        
        try {
            setIsloading(true);
            resetError()
            await login(credentials);
            setIsloading(false);
            onLogin();
            console.log(location);
            const from = location.state?.from?.pathname || '/';
            navigate(from, {replace: true});
        } catch (error) {
            setError(error);
            setIsloading(false);
            console.error(error);
        }finally{
            // setIsloading(false);
        }
    };


    useEffect(()=>{
        ref.current.focus();
    },[])
    console.log(this);
    return(
        <div className="loginPage">
            <h1 className="loginPage-title">Log in to Twitter</h1>
            <form onSubmit={handleSubmit}>
            <FormField
                type="text"
                name="username"
                label="phone, email or username"
                className="loginForm-field"
                value={username}
                onChange={handleInputChange}
                ref={ref}
            />
            <FormField
                type="password"
                name="password"
                label="password"
                className="loginForm-field"
                value={password}
                onChange={handleInputChange}
            />
                {/* <input 
                 type="text"
                 name="username" 
                 id="username" 
                 value={username}
                 onChange={handleInputChange("username", 'value')} />
                <input 
                 type="password" 
                 name="password" 
                 id="password"
                 value={password}
                // hago que handlechange devuelva otra funcion (closure)
                // ya que al evento onChange solo se le puede pasar una función (no el resultado de lo que ejecuta una función)
                 onChange={handleInputChange("password", 'value')} /> */}

                 <input type="checkbox" checked={rememberMe}
                    // onChange={handleInputChange('rememberMe', 'checked')} 
                    onChange={handleInputChange}
                    />
                <select value="1" onChange={$event=> console.log($event)}>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
                {/* Se accede a la información del fichero/ficheros seleccionados de, event.target.files */}
                <input type="file" onChange={$event => console.log($event.target.files)}/>
                <Button type="submit" variant="primary" 
                disabled={inputsAreEmpty() || isLoading} 
                children="Log In"/>
            </form>
            {/* {isLoading && <Spinner/>} */}
            {error && <div onClick={resetError} style={{color: 'red'}}>{error.message}</div>}
        </div>

    );
}


export default LoginPage;