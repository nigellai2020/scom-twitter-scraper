import {ScraperManager} from "../src/managers/scraperManager";

(async () => {
    const scraperManager = new ScraperManager();
    var args = process.argv.slice(2);
    const action = args[0];
    switch(action) {
        case 'get-profile-by-username': {
            const username = args[1];
            const profile = await scraperManager.getProfile(username);
            console.log('profile', profile)
            break;
        }
        case 'get-userid-by-name': {
            const username = args[1];
            const userId = await scraperManager.getUserIdByScreenName(username);
            console.log('User ID: ', userId);
            break;
        }
        case 'get-tweets': {
            const username = args[1];
            const maxTweets = args[2] ? parseInt(args[2]) : 200;
            const tweets = await scraperManager.getTweetsByUserName(username, maxTweets);
            console.log('tweets', tweets.length)
            break;
        }
        case 'get-tweet-by-id': {
            const tweetId = args[1];
            const tweet = await scraperManager.getTweetByTweetId(tweetId);
            console.log(tweet);
            break;
        }
        case 'get-followers': {
            const username = args[1];
            const configs = process.argv.slice(3);
            const credentials: any = {};
            for(let i = 0; i < configs.length; i++) {
                if(configs[i] === '-u' && !!configs[i+1]) {
                    credentials.username = configs[i+1];
                }
                else if(configs[i] === '-p' && !!configs[i+1]) {
                    credentials.password = configs[i+1];
                }
            }
            const followers = await scraperManager.getFollowersByUserName(credentials, username);
            console.log('followers', followers);
            break;
        }
        case 'get-following': {
            const username = args[1];
            const configs = process.argv.slice(3);
            const credentials: any = {};
            for(let i = 0; i < configs.length; i++) {
                if(configs[i] === '-u' && !!configs[i+1]) {
                    credentials.username = configs[i+1];
                }
                else if(configs[i] === '-p' && !!configs[i+1]) {
                    credentials.password = configs[i+1];
                }
            }
            const following = await scraperManager.getFollowingByUserName(credentials, username);
            console.log('following', following);
            break;
        }
        case 'search-tweets': {
            const query = args[1];
            const configs = process.argv.slice(3);
            const credentials: any = {};
            for(let i = 0; i < configs.length; i++) {
                if(configs[i] === '-u' && !!configs[i+1]) {
                    credentials.username = configs[i+1];
                }
                else if(configs[i] === '-p' && !!configs[i+1]) {
                    credentials.password = configs[i+1];
                }
            }
            const tweets = await scraperManager.searchTweets(credentials, query, 50);
            console.log('tweets', tweets);
            break;
        }
        default:
            break;
    }
})();
