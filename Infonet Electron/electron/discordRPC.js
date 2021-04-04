const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

const setDiscordRPCgame = async (details, state, timestamp, largeImg, largeImgText, smallImg, smallImgText, matchKey, joinKey, spectateKey, partyID, partyMembers, partyMax) => {
    rpc.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: details,
            state: state,
            timestamps: {
                start: timestamp
            },
            assets: {
                large_image: largeImg, // large image key from developer portal > rich presence > art assets
                large_text: largeImgText,
                small_image: smallImg,
                small_text: smallImgText
            },
            secrets: {
                match: matchKey,
                join: joinKey,
                spectate: spectateKey,
            },
            party: {
                id: partyID,
                size: [partyMembers, partyMax]
            }
        }
    });
}

const setDiscordRPCbutton = async (details, state, timestamp, largeImg, largeImgText, smallImg, smallImgText, buttonLabel1, buttonURL1, buttonLabel2, ButtonURL2) => {
    rpc.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: details,
            state: state,
            timestamps: {
                start: timestamp
            },
            assets: {
                large_image: largeImg, // large image key from developer portal > rich presence > art assets
                large_text: largeImgText,
                small_image: smallImg,
                small_text: smallImgText
            },
            buttons: [
                { label: buttonLabel1, url: buttonURL1 },
                { label: buttonLabel2, url: ButtonURL2 }
            ]
        }
    });
}

module.exports = {
    setDiscordRPCgame,
    setDiscordRPCbutton
}
