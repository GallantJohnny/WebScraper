const router = require('express').Router();
const scraper = require('../services/scraper');
const cors = require('cors');

router.use(cors());

router.put('/fetch-articles-without-imgs', scraper.returnArticlesWithoutImgs);

module.exports = router;