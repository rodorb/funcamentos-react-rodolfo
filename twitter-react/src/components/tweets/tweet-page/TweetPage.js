import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Page from "../../layout/Page";

const Tweet = ({content}) =>{ return <li>{content}</li> }

const TweetPage =  (props)=>{
    const {tweetId} = useParams();
    return (
        <Page title="Tweet Page" >
            <div>Tweet Page {tweetId}</div>
        </Page>
        
        );
}

export default TweetPage;