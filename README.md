# Overview
This is a final project for the class CS-554 Web Programming II. We created a social media website for self learning students to connect with other students learning the same topics.

## Requirements
This project is build with docker. Here is the official link from their website to set it up on each platform.

### Windows
https://docs.docker.com/desktop/windows/install/

### macOS
https://docs.docker.com/desktop/mac/install/

### Linux
https://docs.docker.com/compose/install/


## Set up
To start the website, run the following. 
```
$ git clone git@github.com:gilgga/Summit.git
$ cd Summit
$ docker-compose up # Older docker versions
$ docker compose up # Newer docker versions
```
The web server will run on https://localhost and the database will be seeded automatically. If you see a self signed certificate error, click advanced and then continue. 

## Without docker
This project can be ran without docker but there have to be a few changes that have to made, and nginx can't be run.

### backend/config/settings.json
Change serverURL to "mongodb://localhost:27017/"

### backend/data/image.js
Change host to "localhost"

### Setting up frontend and backend
```
$ git clone git@github.com:gilgga/Summit.git
$ cd Summit/client # In terminal 1
$ npm install
$ npm start # Frontend running onlocalhost:3000
$ cd Summit/backend # In terminal 2
$ npm install
$ npm start # Backend running on localhost:4000
```

### Setting up services
Set up redis on localhost:6379 and mongodb on localhost:27017.
