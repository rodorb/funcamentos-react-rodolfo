import { useState, useEffect } from "react"; 
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import Page from "../../layout/Page";
import { createTweet } from "../service";
import Photo from '../../common/Photo';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';

const MAX_CHARACTERS = 280;
const MIN_CHARACTERS = 5;
const NewTweetPage = props=>{
    const navigate = useNavigate();
    
    //lo que vayamos escribiendo en el input
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const characters = `${content.length} / ${MAX_CHARACTERS}`;
    const buttonDisabled = content.length < MIN_CHARACTERS;
    const handleChange = (event) =>{
        setContent(event?.target?.value)
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const tweetCreated = await createTweet({content});
            navigate(`/tweets/${tweetCreated.id}`)
        }
         catch (error) {
            setError(error);
        }
    };

    if(error?.status === 401){
        return <Navigate to="/login"/>
    }
    return (
        <Page title="What are you thinking...">
          <div className="newTweetPage bordered">
            <div className="left">
              <Photo />
            </div>
            <div className="right">
              <form onSubmit={handleSubmit}>
                <Textarea
                  className="newTweetPage-textarea"
                  placeholder="Hey! What's up!"
                  value={content}
                  onChange={handleChange}
                  maxLength={MAX_CHARACTERS}
                />
                <div className="newTweetPage-footer">
                  <span className="newTweetPage-characters">{characters}</span>
                  <Button
                    type="submit"
                    className="newTweetPage-submit"
                    variant="primary"
                    disabled={buttonDisabled}
                  >
                    Let's go!
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Page>
      );
}

export default NewTweetPage;