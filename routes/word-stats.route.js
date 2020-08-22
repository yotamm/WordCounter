const byteConverter = require('binstring');
const http = require('http');
const parseUrl = require('url-parse');
const express = require('express');
const router = express.Router();
const statsManagerUtil = require('../statistics-manager/statistics-manager');


router.post('/', async function (req, res) {
    console.log('POST request received at /word-stats');
    const contentType = req.header('Content-Type');
    try {
        switch (contentType) {
            case 'text/plain':
                statsManagerUtil.getInstance().addToStatistics(req.body);
                res.status(200).send();
                break;

            case 'application/octet-stream':
                const text = byteConverter(req.body, {out: 'utf8'});
                statsManagerUtil.getInstance().addToStatistics(text);
                res.status(200).send();
                break;

            case 'application/json':
                const {url} = req.body;
                const {pathname, host} = parseUrl(url, {});
                const options = {
                    host: host,
                    path: pathname,
                    method: 'GET',
                    headers: {
                        'Accept': 'text/plain'
                    }
                };
                const callback = (refResponse) => {
                    let text = '';
                    refResponse.on('data', (chunk) => text += chunk);
                    refResponse.on('end', () => {
                        console.log('Payload URL received');
                        statsManagerUtil.getInstance().addToStatistics(text);
                    });
                };
                http.request(options, callback).end();
                res.status(200).send();
                break;

            default:
                console.log('Invalid Content-Type');
                res.status(400).send();
                break;
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send();
    }
});

router.get('/', function (req, res) {
    console.log('GET request received at /word-stats');
    if (!req.accepts('json')) {
        res.status(400).send();
    } else {
        try {
            const result = statsManagerUtil.getInstance().getWordStatistics(req.query['word']);
            res.status(200).send(result);
        } catch (error) {
            console.error(error.message);
            res.status(400).send();
        }
    }
});

module.exports = router;
