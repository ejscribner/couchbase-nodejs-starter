## WORK IN PROGRESS 
#### Last Updated: April 19 2021

# couchbase-nodejs-starter
A starter/shell app for beginning a node.js/express app using Couchbase 

## Getting Started
- For quick setup, this starter app is designed to run with a local instance of Couchbase Server running in docker
    - Plans to extend to work with a cloud environment in the future.
- `npm install` to install dependencies
- `node index.js` to run on port 3000
- Serves app on [localhost:3000](http://localhost:3000/)

## Demo Routes
- / 
    - Just a hello world page for now
- /airlines
    - Returns 5 documents with `type: "airline"` (limited to 5 for efficiency in testing)
- /airlines/:key
    - Fetch and return an airline (or any document, for now) by it's key 

## Troubleshooting
- If errors occur after `npm install`, it may be necessary to run `npm-rebuild
    - _Note:_ This may take a few minutes
