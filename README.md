# Pokedex - A Pokemon Search Engine
This Pokedex is a comprehensive application that allows users to search for Pokemon data, display detailed information about each Pokemon, and interact with a user-friendly interface. The application is built using modern web technologies and follows best practices for both frontend and backend development.

## Overview
### The Pokedex  consists of two main parts:

1. Backend Server: A Node.js Express server that handles API requests for fetching Pokemon data. It uses environment variables for configuration, such as the port number and CORS settings, and integrates with a caching mechanism to improve performance.

2. Frontend Application: A React application that provides a user interface for searching Pokemon by name or names separated by commas. It displays a list of Pokemon cards, each of which can be clicked to view more detailed information in a modal popup. The application also includes a navigation bar and handles loading and error states gracefully.

## Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)
- A modern web browser

## Installation
Clone the repository
```
https://github.com/saurabh78crypto/pokedex-search-engine-main.git
```

### Setting up the Server
1. Navigate to the server directory
```
cd server
```
2. Install dependencies
```
npm install
```
3. Create a .env file in the root of the server directory and add following variables
```
PORT
BASE_URL
CORS_ORIGIN
CORS_METHODS
```
4. Start the server
```
npm start
```
### Setting up the Client
1. Navigate to the client directory
```
cd client
```
2. Install dependencies
```
npm install
```
3. Start the server
```
npm start
```

## Usage
1. Open the frontend application in your web browser by navigating to ```http://localhost:3000```
2. Use the search input to enter one or more Pokemon names separated by commas.
3. Click the "Search" button to fetch and display the Pokemon data.
4. Click on a Pokemon card to view more detailed information in a modal popup.

## Features
- Search Functionality: Users can search for one or more Pokemon by name.
- Detailed Information: Each Pokemon card displays basic information and can be expanded to show more details.
- Caching: The backend server caches Pokemon data to improve response times.
- Responsive Design: The application is designed to be responsive and works well on both desktop and mobile devices.


