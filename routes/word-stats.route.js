const express = require('express');
const router = express.Router();
const wordStatsUtil = require('../statistics-manager/statistics-manager');


router.post('/', function (req, res, next) {
    const contentType = req.header('Content-Type');
    try {
        switch (contentType) {
            case 'text/plain':
                //TODO
                res.status(200).send();
                break;
            case 'text/url':
                //TODO
                res.status(200).send();
                break;
            default:
                //TODO
                res.status(415).send();
                break;
        }
    } catch (error) {
        //TODO
    }
});

router.get('/', function (req, res, next) {
    if (req.accepts('application/json')) {
        res.status(400).send();
    } else {
        try {
            const result = wordStatsUtil.getInstance().getWordStatistics(req.query['word']);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
});

module.exports = router;
