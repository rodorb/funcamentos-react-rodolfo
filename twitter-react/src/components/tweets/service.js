import AxiosClient from "../../api/axiosClient";


const tweetsBaseUrl = '/api/tweets'
export const getLatestTweets = () => {
    const url = `${tweetsBaseUrl}`;
    return AxiosClient.get(url);
};


export const getTweet = (tweetId) => {
    const url = `${tweetsBaseUrl}/${tweetId}`;
    return AxiosClient.get(url);
}

export const createTweet = tweet => {
    const url = `${tweetsBaseUrl}`;
    return AxiosClient.post(url, tweet);
}