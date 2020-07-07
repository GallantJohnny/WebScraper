const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchMaximumNumOfPages = async (req, res) => {
  let numOfPages = await fetchMaximumNumOfPages();

  res.status(200).json(numOfPages);
}

exports.returnArticlesWithoutImgs = async (req, res) => {
  let numOfPages = req.body.numOfPages;
  let articlePages = [];
  const maxNumOfPages = await fetchMaximumNumOfPages();

  // Find out how many pages there are and set numOfPages accordingly
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

  numOfPages = dateText.match(/\d/g)[1];

  return numOfPages;
}

const returnArticleWithoutImgs = (articlePages) => {
  return new Promise((resolve, reject) => {
    // Cut and store the last link in the array
    const lastPage = articlePages.pop();
    // Links to article without any imgs will be stored as a string in this array
    let noImgLinks = [];

    // Go trough each article on stored page
    axios.get(lastPage).then(async response => {
      const $ = cheerio.load(response.data);
      const aHref = [];

      $('.post-title a').each((i, element) => aHref.push($(element).attr('href')));

      // Create an array of promises
      const promises = aHref.map(url => {
        const singleLinkToArticle = `https://blog.risingstack.com${url}`;
        return new Promise((resolve, reject) => {
          axios.get(singleLinkToArticle).then(response => {
            const $ = cheerio.load(response.data);
            const title = $('.post-jumbotron-title').text();
            const updated = $('.post-jumbotron-last-updated time').text();
            if (cheerio.html($('article div p img')) === '') noImgLinks.push({
              url: singleLinkToArticle,
              title: title,
              updated: updated
            });
            resolve();
          });
        });
      });

      // Only resolve if all the promises finished
      Promise.all(promises).then(async values => {
        if (articlePages.length) {
          // Recursively go trough each blog page until none left
          const links = await returnArticleWithoutImgs(articlePages);
          links.forEach(element => {
            noImgLinks.push(element);
          });
          resolve(noImgLinks);
        } else {
          // No blog page left, return urls to articles without imgs
          resolve(noImgLinks);
        }
      });
    })
  })
}