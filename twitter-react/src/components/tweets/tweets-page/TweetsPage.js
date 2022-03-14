import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import Page from "../../layout/Page";
import { getLatestTweets } from "../service";
import './TweetsPage.css';
import styles from './TweetsPage.module.css';

console.log(styles);
const Tweet = ({id, content}) =>{ return(
    <li>
        <Link to={`/tweets/${id}`}>{content}</Link> 
    </li> )  
}

const TweetsPage =  (props)=>{
    //definir un estado, que hará referencia al array de tweets
    //como estado inicial definimos un array vacío
    const [tweets , setTweets] = useState([]);

    useEffect(()=>{
        (async function fetchTweets() {
            try {
              const tweestList = await getLatestTweets();
              setTweets(tweestList);  
            } catch (error) {
               console.error(error); 
            }
        })();//meto la promesa en una función autoejecutada porque la función de callback de useEffect no debe ser asíncrona
            // ya que esta funciçon de callback solo puede devolver undefined o una función (la función que se ejecuta al "desmontarse", para limpiar intervalos, subscriptores, etc...)
    }, [])//meto la llamada al api en un efecto que se ejecute después del primer render
   
    console.log('tweets',tweets);
    const styleObj = {
        listStyle: 'none',
        margin : 0,
        padding: '3rem',
        display: tweets ? 'block' : 'none'
    }
    // usando css modules, se pueden usar estilos de forma local
    return (
        <Page title="What's new">
            <div className={styles.tweetsPage}>
            {/*<div className="tweetsPage" id="page">  */}
                <ul style={styleObj}>
                    {tweets.map((tweet)=>{
                        // el prop key es importante ya que es importante para
                        //el virtualdom de react, si no se le pone, da error
                        //esto es importante en renderización de
                        // elementos a través de un array
                        return <Tweet key={tweet.id} {...tweet} />
                    })}
                </ul>
            </div>
        </Page>
        
        )
}

export default TweetsPage;