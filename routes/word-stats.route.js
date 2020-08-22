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
            case 'text/url':
                const response  = await fetch(req.body)
                if (!response.ok) {
                    throw new Error('Payload URL access failed');
                }
                statsManagerUtil.getInstance().addToStatistics(response.text());
                res.status(200).send();
                break;
            case 'application/octet-stream':
                const text = req.body.text();
                statsManagerUtil.getInstance().addToStatistics(text);
                break;
            default:
                console.log('Invalid Content-Type');
                res.status(415).send();
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
