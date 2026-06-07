# GitHub Profile Analyzer API

A backend service built with Node.js, Express.js, MySQL, and GitHub API.

## Features

* Fetch GitHub profile using username
* Store profile data in MySQL
* Update existing profiles automatically
* Retrieve all stored profiles
* REST API architecture

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub Public API
* Axios

## API Endpoints

### Get GitHub Profile

GET /api/github/:username

Example:

GET /api/github/octocat

### Get All Stored Profiles

GET /api/github/profiles/all

## Database

Database Name:

github_analyzer

Table Name:

github_profiles

## Run Project

npm install

npm start

Server:

http://localhost:5000

## Author

Bhargavi Aakarapu
