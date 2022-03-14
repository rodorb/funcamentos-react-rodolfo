import { useState, useEffect } from "react"; 
import Layout from "../../layout/Layout";
import Page from "../../layout/Page";



const NewTweetPage = props=>{

    return (
        <Page title="What are you thinking" {...props}>
            <div>NewTweetPage</div>
        </Page>
        
        );
}

export default NewTweetPage;