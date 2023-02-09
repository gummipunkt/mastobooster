/* 
import modules 
*/
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

// Hashtag generation
const hashtag = process.env.HASHTAG;

// Search for Hashtag
// async because masto.v1.timelines.listHashtag needs await for promise
async function getHashtag() {
	const search = await masto.v1.timelines.listHashtag(hashtag);
	return search;
}


// initialize json_data array
let json_data = [],
		obj;

console.log("Search for Hashtag: #" + hashtag + " in the known Fediverse");
console.log("Start in 60 seconds. Just wait.");

// start boosting every minute
cron.schedule('* * * * *', () => {

	console.log("Start searching for new toots.");
	console.log(" - - - - - - - - ");

	// call function getHashtag and ad .then to get the result. need .then because getHashtag is async
	getHashtag().then(search => {
		for (let i = 0; i < search.length; i++) {
			// Json read and write
				//create toot_id and id for json
				let toot_id = search[i].id;
				// create a JSON object
				obj = {};
				obj['toot_id'] = toot_id;
				obj['boosted'] = false;
		
				// add object to array
				json_data.push(obj);
			}
	}).catch(err => {
		console.log(err);
	});

	// write JSON object to file
	fs.writeFile(filepathenv, JSON.stringify(json_data), {flags:'a'}, function(err){
		if (err ) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully wrote file')
			// for loop to boost all toots and check if they are already boosted
			for (let i = 0; i < json_data.length; i++){
				// check if toot is already boosted
				if (json_data[i].boosted == true) {
					// if not boosted, boost toot and set state to boosted
				} else if (json_data[i].boosted == false) {
					// boost toot id
					masto.v1.statuses.reblog(json_data[i].toot_id);
					// set state boosted to true
					json_data[i].boosted = true;
					console.log("Boost Toot ID: " + json_data[i].toot_id);
					console.log("Toot ID: " + json_data[i].toot_id + " boosted.");
					console.log(" - - - - - - - - ");
				} else {
					console.log("FAIL");
				} {
					
				};
			};
			console.log("Search finished. Everything is boosted. Start again in 60 seconds. Happy tooting.")
		}
	});
});