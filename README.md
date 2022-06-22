# TextAnalyser

### A web application to analyse whether the given input contains hate speech

[![Built By](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=yellow)]()

This web application lets you analyse the sentiments of a content, the content could be **peice of
text** or a **tag of a topic**. If you input a tag then the application will look for all the recent tweets
related to that topic tag and do the sentiment analysis on content of those tweets.

For a deeper dive into purpose of this application see :https://devfolio.co/projects/hateanalyser-1f48

## Features

- Generate full sentiment analysis report
- Get the sentiment analysis of a whole topic discussed on twitter.

## Tech

TextAnalyser uses a number of open source projects to work properly:

- VueJS - awesome frontend framework!
- Express - serving the api backend, and the static files
- Twitter API - enables access to content of Twitter
- Tisane API - analyse and understand text
- Vite - module bundler for faster development

## Run this application on your machine

TextAnalyser requires [Node.js](https://nodejs.org/) to run.

Clone the repository

```sh
git clone https://github.com/mayankjx/NLP-project.git
```

Installing dependencies and starting node application

```sh
npm install
npm run server
```

To tweak and develop frontend locally
_in another terminal run following commands_

```sh
cd client
npm install
npm run dev
```

To generate static files 

```sh
npm run build --overRide
```
