# Mastobooster

![mastobooster](https://user-images.githubusercontent.com/6688679/220034174-c06cca90-2838-460f-9d75-96a76f5e1fcb.png)


**Boost your favorite hashtag on Mastodon.**

## Demo
![masto.wltr.pw](https://masto.wltr.pw)
![My Mastodon Instance](https://wltr.pw)
## Installation

- **Install NodeJS and npm** 
	 - nodejs (>= v18) npm 
- **Clone & Initialize Project**
	- `$ git clone` 
	- `$ cd mastobooster`
	- `$ 'npm init es6 --yes'` 
- **Install npm packages**
	- `$ npm install masto dotenv fs` 
- **Edit .env** 
	- `$ vim .env` 
- **Copy NGINX Conf**
	- `$ sudo cp nginx-example.conf /etc/nginx/sites-enabled/mastobooster.conf`
- **Edit NGINX Conf**
	- `$ sudo vim /etc/nginx/sites-enabled/mastobooster.conf`
		- replace *.domain.tld 
		- use certbot (or certbot --nginx) to generate your cert
- **Start Node** 
	- `$ node generator.js`

If you want, you can use PM2 to run index.js forever
	- `$ pm2 start generator.js --name mastobooser`

## Todo

 - [ ] check how many toot_ids are in the json file and delete the
       oldest ones
 - [ ]  support multiple hashtags
 - [ ]  Improve website
	 - [ ] Add Cards
	 - [ ] Add Toot Content
	 - [ ] Add Time
 - [ ] Add Admin Interface

## Done
 - [x] Boost favorit hashtag
 - [x] Website to show boosted Toots

## License

EUPL 1.2 (European Union Public License 1.2) Please take a look here for more information: LICENSE.MD

## Disclaimer

Please be aware: This is my first self-written project and I'm a complete newbie. This code is far away to be perfect.
