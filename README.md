# Word Statistics

An English word appearance stats collector. Text input format options: plain text, file, remote URL.

## Get Started

1. Open a Terminal and change directory to the project folder.
2. Run `npm install`.
3. Run `npm run start` to run the server. The server will start listening on port 3000.

## Discard Collected Statistics

1. Stop the server instance if it is running.
2. Open a Terminal and change directory to the project folder.
3. Run `npm run discard` to discard the old statistics.

## Restart With Empty Statistics
1. Stop the server instance if it is running.
2. Open a Terminal and change directory to the project folder.
3. Run `npm run start:fresh` to discard the statistics and run the server. The server will start listening on port 3000.

## API
### `/word-stats`
* `GET` Method
    1. Client must accept JSON response (Include header `Accept: application/json`).
    2. Response format: `{word: string, count: number}`.
* `POST` Method
    1. Client must declare content type with matching payload (Include header `Content-Type`)
        1. `Content-Type: text/plain` with matching string payload.
        2. `Content-Type: application/octet-stream` with matching uploaded-file payload. 
        3. `Content-Type: application/json` with matching `{url: string}` payload. Accepting only `text/plain` as the response media type from the remote.
        
## Notes
* Word contractions count as a word (e.g. you're is different from you are).
* I have added unit tests for the Trie module and the Statistics Manager module.

