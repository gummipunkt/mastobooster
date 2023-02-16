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

function initialPush() {
    obj = {
        "tootID": "0",
        "boosted": true
    };
    jsonData.push(obj);
}

initialPush();

function startBoosting() {
    // Search for Hashtag Function with a Promise
    const search = new Promise((resolve, reject) => {
        const promiseReceiveHashtag = masto.v1.timelines.listHashtag(hashtag);
        if (promiseReceiveHashtag) {
            resolve(promiseReceiveHashtag);
            return promiseReceiveHashtag;
        } else {
            reject("Error");
        }
    });

    // Start Promise Receiving Toots

    search.then((promiseReceiveHashtag) => {
        for (let i = 0; i < promiseReceiveHashtag.length; i++) {     
            //create tootID and id for json
            let tootID = promiseReceiveHashtag[i].id;
            obj = {};
            obj['tootID'] = tootID;
            obj['boosted'] = false;
            //console.log("jsonDataParse[1].tootID: " + jsonData[i].tootID);
            //console.log("tootID: " + tootID);
            if (jsonData.length > 1 && jsonData[i].tootID == 0) {
                jsonData.splice(0, 1);
                //console.log("Toot 0 removed.");
            }

            //FIXME: We need to find a way to check if the tootID is already in the array. Current state: everything is fine,
            // but when a new toot is added, it will crashes because tootid and jsondata.tootid doesn't match anymore. :-/
            //readtootsJS(); here perhaps?
            
            //if (jsonData.find(record => record.tootID === tootID) === true) {
            if (jsonData[i].tootID == tootID) {
            console.log("Toot already in array: " + tootID);
            } else {
            console.log("Toot not in array: " + tootID);
            // add object to array
            jsonData.push(obj);
            }            
        }
    }).then((boost) => {
        for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].boosted == false) {
            masto.v1.statuses.reblog(jsonData[i].tootID);
            jsonData[i].boosted = true;
            console.log("Boosted: " + jsonData[i].tootID + " - New State: " + jsonData[i].boosted);
            } else {
                console.log("Already boosted: " + jsonData[i].tootID + " - Current State: " + jsonData[i].boosted);
            }
        }
    })        
};

function writeTootsJS(){
    const promiseWriteFile = new Promise((resolve, reject) => {
        fs.writeFile(filepathenv, JSON.stringify(jsonData), {flags:'a'}, function(err, jsonData){
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

console.log("Start script in 20s.");
function doStuff() {
	console.log("Start searching for new toots.");
	console.log(" - - - - - - - - ");

	// start search
	startBoosting();
    writeTootsJS();
    readTootsJS();
	console.log("Search finished. Everything is boosted. Start again in 60 seconds. Happy tooting.");
  };

  
function run() {
	setInterval(doStuff, 20000);
};
  
run();
