const router = require('express').Router();
const scraper = require('../services/scraper');

router.put('/fetch-html', scraper.returnArticlesWithoutImgs);

module.exports = router;