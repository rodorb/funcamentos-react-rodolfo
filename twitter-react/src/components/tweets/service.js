import AxiosClient from "../../api/axiosClient";


const tweetsBaseUrl = '/api'
export const getLatestTweets = () => {
    const url = `${tweetsBaseUrl}/tweets`;
    return AxiosClient.get(url);
};