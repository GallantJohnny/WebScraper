const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchMaximumNumOfPages = async (req, res) => {
  let numOfPages = await fetchMaximumNumOfPages();

  res.status(200).json(numOfPages);
}

exports.returnArticlesWithoutImgs = async (req, res) => {
  let numOfPages = req.body.numOfPages;
  let articlePages = [];
  // Find out how many pages there are and set maxNumOfPages accordingly
  const maxNumOfPages = await fetchMaximumNumOfPages();

  // If request numOfPages = 1, than all pages needs to be searched
  if (numOfPages == 1) {
    numOfPages = maxNumOfPages;
  }

  if (numOfPages <= maxNumOfPages) {
    for (let i = 1; i <= numOfPages; i++) {
      articlePages.push(`https://blog.risingstack.com/page/${i}`);
    }

    console.log('Start: ' + Date.now() / 1000);
    const links = await returnArticleWithoutImgs(articlePages);
    res.send(links);
    console.log('Finish: ' + Date.now() / 1000);
    console.log('--------------------');
  } else {
    res.status(404).end();
  }
}

const fetchMaximumNumOfPages = async (req, res) => {
  let numOfPages = '';
  const response = await axios.get('https://blog.risingstack.com');
  const $ = cheerio.load(response.data);
  const dateText = $('.page-number').text();

  // Matches a regex pattern for the last digit,
  // which represents the current number of pages
  numOfPages = dateText.match(/\d/g)[1];

  return numOfPages;
}

const returnArticleWithoutImgs = async (articlePages) => {
  // Cut and store the last link in the array
  const lastPage = articlePages.pop();

  // Go trough each article on stored page
  const response = await axios.get(lastPage);
  const $ = cheerio.load(response.data);

  const promises = $('.post-title a').toArray().map(async (element) => {
    const attrValue = $(element).attr('href');
    const singleLinkToArticle = `https://blog.risingstack.com/${attrValue}`;
    const response = await axios.get(singleLinkToArticle);
    const $$ = cheerio.load(response.data);
    const title = $$('.post-jumbotron-title').text();
    const updated = $$('.post-jumbotron-last-updated time').text();
    if (cheerio.html($$('article div p img')) === '') return {
      url: singleLinkToArticle,
      title: title,
      updated: updated
    };
  });

  // Only resolve if all the promises finished
  const resolved = await Promise.all(promises);
  const filtered = resolved.filter(value => value === undefined ? false : true);
  if (articlePages.length) {
    // Recursively go trough each blog page until none left
    const links = await returnArticleWithoutImgs(articlePages);
    return filtered.concat(links);
  } else {
    // No blog page left, return urls to articles without imgs
    return filtered;
  }
}