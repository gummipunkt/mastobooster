/* import modules */
// Mastodon
import { login } from 'masto';
// ENV
import dotenv from 'dotenv';
// file system for json
import fs from 'fs';
// cron for scheduling
import cron from 'node-cron';

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

// Search for Hashtag Function
// async because masto.v1.timelines.listHashtag needs await for promise
async function getHashtag() {
	const search = await masto.v1.timelines.listHashtag(hashtag);
	return search;
}

// initialize jsonData array
let jsonData = [],
		obj;

function generateHashtag() {
		// call function getHashtag and ad .then to get the result. need .then because getHashtag is async
		getHashtag().then(search => {
			for (let i = 0; i < search.length; i++) {
				// Json read and write
					//create tootID and id for json
					let tootID = search[i].id;
					// create a JSON object
					obj = {};
					obj['tootID'] = tootID;
					obj['boosted'] = false;
			
					// add object to array
					jsonData.push(obj);
				}
		}).catch(err => {
			console.log(err);
		});
};

// Boost Function
function boost() {
	for (let i = 0; i < jsonData.length; i++){
		// check if toot is already boosted
		// if not boosted (.boosted == false), boost it
		if (jsonData[i].boosted == false) {
			// boost toot id
			masto.v1.statuses.reblog(jsonData[i].tootID);
			// set state boosted to true
			jsonData[i].boosted = true;
			//jsonData.push(jsonData[i]);
			console.log("Toot ID: " + jsonData[i].tootID + " boosted.");
			console.log(" - - - - - - - - ");
		} else {
			console.log("Toot ID: " + jsonData[i].tootID + " already boosted.");
			console.log(" - - - - - - - - ");
		};
	};
};

// Write JSON Function
function writeJSON(){
	// write json file
	fs.writeFile(filepathenv, JSON.stringify(jsonData), {flags:'a'}, function(err){
		if (err ) {
			console.log('Error writing file', err)
		} else
		console.log('Successfully wrote file')
	});
};

console.log("Search for Hashtag: #" + hashtag + " in the known Fediverse");
console.log("Start in 60 seconds. Just wait.");

// start boosting every minute
cron.schedule('* * * * *', () => {

	console.log("Start searching for new toots.");
	console.log(" - - - - - - - - ");

	// start search
	generateHashtag();

	// start boost
	boost();

	// write json
	writeJSON();

	console.log("Search finished. Everything is boosted. Start again in 60 seconds. Happy tooting.");
});
