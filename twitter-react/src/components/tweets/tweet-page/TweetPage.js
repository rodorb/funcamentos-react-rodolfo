import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Page from "../../layout/Page";
import { getTweet } from "../service";


//componente como clase
class TweetPageClass extends React.Component {
    constructor(props){
        super(props);
        //declarar un estado en el constructor
        this.state = {
            tweet: null,
            error: null,
            isLoading: false
        }
    }

    async getTweetData(){
        const {tweetId} = this.props;
        this.setState({isLoading: true})
        try {
            const tweetData = await getTweet(tweetId);
            //aquí solo se le pasa la parte que quiere modificar
            //a diferencia de en useState
            this.setState({ tweet: tweetData, isLoading: false });
            //setState produce un render nuevo ya que modifico el estado
        } catch (error) {
           this.setState({ isLoading:false, error:error}) 
        }
        
        
    }

    //ciclo de vida -  tras renderizarse por primera vez
    componentDidMount(){
        console.log('mounted');
        this.getTweetData();
    }

    // ciclo de vida - cuando se produzca un nuevo renderizado tras un cambio de estado
    // no se vuelve a renderizar el e componentedidmount
    componentDidUpdate(previousProps, previousState){
        //estado y props anterior
        console.log('old', previousProps, previousState);
        //estado y props actual
        console.log('new', this.props, this.state);
    }

    //ciclo de vida - cuando el componente va a destruirse del DOM
    componentWillUnmount(){
        console.log('unmounting');
    }

    //método que retorna la vista del componente
    render(){
        const { tweet, error, isLoading } = this.state;

        //isLoading - display an spinner
        // error !== 404 - show an alert popup or notification
        if(error?.status === 404){
            return <Navigate to="/404" />
        }

        if(error?.status === 401){
            return <Navigate to="/login" />
        }

        return (
            <Page title="Tweet Page" >
                <div>
                    {tweet? JSON.stringify(tweet): 'No tweets around...'}
                </div>
            </Page>
            
            );
    }

}

const TweetPageFunction = ()=>{
    const [tweet, setTweet] = useState(null);
    const {tweetId} = useParams();
    useEffect(()=>{
        (async()=>{
            try {
            const tweetData = await getTweet(tweetId);
            //aquí solo se le pasa la parte que quiere modificar
            //a diferencia de en useState
            setTweet({ tweet: tweetData, isLoading: false });
            //setState produce un render nuevo ya que modifico el estado
            } catch (error) {
            setTweet({ isLoading:false, error:error}) 
            }
        })();

        // función que se retorna y se ejecuta antes de ejecutar el siguiente efecto
        // y siempre antes de desmontar
        return ()=>{

        }
    }, [tweetId]);//los efectos siempre se ejecutan del primer render, y si ponemos en el array de dependencias una variable, tambien se eejcuta despues de que cambie esa variable
    return (
        <Page title="Tweet Page" >
            <div>
                {tweet? JSON.stringify(tweet): 'No tweets around...'}
            </div>
        </Page>
    );
}

const TweetPage = ()=>{
    const ref = useRef(null);
    const {tweetId} = useParams();
    useEffect(()=>{
        console.log('ref', ref.current);
    },[]); 

    return <TweetPageClass  ref={ref} tweetId={tweetId}></TweetPageClass>
}

// const Tweet = ({content}) =>{ return <li>{content}</li> }

// const TweetPage =  (props)=>{
//     const {tweetId} = useParams();
//     return (
//         <Page title="Tweet Page" >
//             <div>Tweet Page {tweetId}</div>
//         </Page>
        
//         );
// }

export default TweetPage;