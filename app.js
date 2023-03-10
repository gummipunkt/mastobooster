/* import modules */
// Mastodon
import { login } from 'masto';
// ENV
import dotenv from 'dotenv';
// file system for json
import fs, { write } from 'fs';

// read .env file
dotenv.config({ path: './.env' });
const filepathenv = process.env.FILE;

const filepathhashtagenv = process.env.FILEHASHTAG;


// Mastodon Login
const masto = await login({
	url: process.env.URL,
	accessToken: process.env.TOKEN,
});

// Import Hashtag
const hashtag = process.env.HASHTAG;

// initialize jsonData array
let jsonData = [],
		obj;


const jsonDataHashtag = [{"hashtag": hashtag}];

function writeHashtagJS(){
    const promiseWriteFile = new Promise((resolve, reject) => {
        fs.writeFile(filepathhashtagenv, JSON.stringify(jsonDataHashtag), {flags:'a'}, function(err, jsonDataHashtag){
            if (err ) {
                console.log('Error writing file', err)
            } else {
                resolve(jsonDataHashtag);
                // clear jsonData array
                console.log('Successfully wrote hashtag file')
            }
        });
    }).catch(err => console.log(err)); 
}


// FIXME: this is crap, but it works for now.
// initial push to array to prevent crashes
function initialPush() {
    obj = {
        "tootID": "0",
        "boosted": true,
        "url": "https://mastodon.social",
        "username": "user",
        "avatarStatic": "https://mastodon.social",
        "createdAt": "2020-01-01T00:00:00.000Z",
        "content": ""
    };
    jsonData.push(obj);
}


// FIXME: this is crap, but it works for now.
// start initial push
initialPush();


// start boosting
function startBoosting() {
    // Search for Hashtag Function with a Promise
    const search = new Promise((resolve, reject) => {
        // call hashtags from mastodon instance
        const promiseReceiveHashtag = masto.v1.timelines.listHashtag(hashtag);
        if (promiseReceiveHashtag) {
            resolve(promiseReceiveHashtag);
        } else {
            reject("Error");
        }
    });

    // Start Promise Receiving Toots
    search.then((promiseReceiveHashtag) => {
        // loop through all received toots with given hashtag
        for (let i = 0; i < promiseReceiveHashtag.length; i++) {     
            //create tootID and id for json
            let tootID = promiseReceiveHashtag[i].id;
            let url = promiseReceiveHashtag[i].uri;
            let username = promiseReceiveHashtag[i].account.username;
            let avatarStatic = promiseReceiveHashtag[i].account.avatarStatic;
            let createdAt = promiseReceiveHashtag[i].createdAt;
            let content = promiseReceiveHashtag[i].content;

            //console.log(promiseReceiveHashtag[i].uri);
            // create a JSON object
            obj = {};
            obj['tootID'] = tootID;
            obj['boosted'] = false;
            obj['url'] = url;
            obj['username'] = username;
            obj['avatarStatic'] = avatarStatic;
            obj['createdAt'] = createdAt;
            obj['content'] = content;


            // FIXME: this is crap, but it works for now.
            // remove initialPush() from array if there is more that single entry in array
            if (jsonData.length > 1 && jsonData.find(record => record.tootID === "0")) {
                let j = jsonData.findIndex(record => record.tootID === "0");
                jsonData.splice(j, 1);
                // uncomment for debugging
                //console.log("Toot already in array: " + tootID + " match with " + jsonData[i].tootID);
            }
            
            // check if tootID is already in array
            if (jsonData.find(record => record.tootID === tootID)) {
                // uncomment for debugging
                //console.log("Toot already in array: " + tootID + " match with " + jsonData[i].tootID);
            } else {
                // if not, add unshift object to array
                console.log("Toot not in array: " + tootID);
                // add object to array
                jsonData.unshift(obj);
            }       
        }
        // check if we want to boost toots in array
    }).then((boost) => {
        // loop through all toots in array
        for (let i = 0; i < jsonData.length; i++) {
            // check if toot is already boosted
            if (jsonData[i].boosted == false) {
            // boost toot if not already boosted
            masto.v1.statuses.reblog(jsonData[i].tootID);
            // set boosted to true to prevent boosting again
            jsonData[i].boosted = true;
            console.log("Boosted: " + jsonData[i].tootID 
            // uncomment following line for debugging
            //+ " - New State: " + jsonData[i].boosted
            );
            } else {
                // if already boosted, log it and do nothing
                console.log("Already boosted: " + jsonData[i].tootID 
                // uncomment following line for debugging
                //+ " - Current State: " + jsonData[i].boosted
                );
            }
        }
    }).finally(() => {
        console.log("Search finished. Everything is boosted. Start again in 20 seconds. Happy tooting.");
    });
};

// write toots to json file
function writeTootsJS(){
    const promiseWriteFile = new Promise((resolve, reject) => {
        fs.writeFile(filepathenv, JSON.stringify(jsonData), {flags:'w+'}, function(err, jsonData){
            if (err ) {
                console.log('Error writing file', err)
            } else {
                resolve(jsonData);
                // clear jsonData array
                console.log('Successfully wrote file')
            }
        });
    }).catch(err => console.log(err)); 
}

// read toots from json file
function readTootsJS(){
    const promiseReceiveFile = new Promise((resolve, reject) => {
        fs.readFile(filepathenv, 'utf8', function(err, readTootFile){
            if (err){
                console.log(err);
            } else {
                resolve(readTootFile);
            }
        })
    });

    // Start Promise Receiving Toots
    promiseReceiveFile.then((readTootFile) => {
        console.log("File read success.");
    })
};


// start script loop
console.log("Start script in 20s.");
// call function boosting with all the stuff
function boosting() {
	console.log("Start searching for new toots.");
	console.log(" - - - - - - - - ");

	// start search
	startBoosting();
    writeTootsJS();
    writeHashtagJS();
    readTootsJS();
  };

// set interval to run script every 20 seconds
function run() {
	setInterval(boosting, 20000);
};
  
// start the fun
run();
