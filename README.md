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


## Usage
To start the website, run the following. 
```
$ git clone git@github.com:gilgga/Summit.git
$ cd Summit
$ docker-compose up # Older docker versions
$ docker compose up # Newer docker versions
```
The web server will run on https://localhost. If you see a self signed certificate error, click advanced and then continue. 
