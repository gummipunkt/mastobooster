# Mastobooster

Boost your favorit hashtag on Mastodon.

## Installation
1. Install NodeJS and npm
    1. nodejs (>= v18)
    2. npm
2. Clone & Initialize Project
    1. git clone 
    2. cd into folder
    3. 'npm init es6 --yes'
3. Install npm packages
    1. npm install masto dotenv fs
4. Edit .env
    1. vim .env
5. Start
    1. node index.js

If you want, you can use PM2 to run index.js forever

## Todo
- check if id is already in json file and don't push it again
- check how many toot_ids are in the json file and delete the oldest ones
- set maximum number of toot_ids in json file
- support multiple hashtags

## License
EUPL 1.2 (European Union Public License 1.2)
Please take a look here for more information: LICENSE.MD

## Disclaimer
Please be aware: This is my first self-written project and I'm a complete newbie. This code is far away to be perfect.
