const axios = require('axios');
const cheerio = require('cheerio');

exports.returnArticlesWithoutImgs = async (req, res) => {
  let numOfPages = req.body.numOfPages;
  let articlePages = [];

  // Find out how many pages there are and set numOfPages accordingly
  if (numOfPages == 1) {
    const response = await axios.get('https://blog.risingstack.com');
    const $ = cheerio.load(response.data);
    const dateText = $('.page-number').text();
    numOfPages = dateText.match(/\d/g)[1];
  }

  for (let i = 1; i <= numOfPages; i++) {
    articlePages.push(`https://blog.risingstack.com/page/${i}`);
  }

  console.log('Start: ' + Date.now() / 1000);
  const links = await recursiveFunction(articlePages);
  res.send(links);
  console.log('Finish: ' + Date.now() / 1000);
  console.log('--------------------');
}

const recursiveFunction = (articlePages) => {
  return new Promise((resolve, reject) => {
    const lastPage = articlePages.pop();
    let noImgLinks = [];

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
          const links = await recursiveFunction(articlePages);
          links.forEach(element => {
            noImgLinks.push(element);
          });
          resolve(noImgLinks);
        } else {
          // No blog page left, return links to articles without imgs
          resolve(noImgLinks);
        }
      });
    })
  })
}

const nonRecursiveFunction = async (articlePages) => {
  let noImgLinks = [];
  const articlePagePromises = articlePages.map(articlePageUrl => {
    return new Promise((resolve, reject) => {
      axios.get(articlePageUrl).then(async response => {
        const $ = cheerio.load(response.data);
        const aHref = [];

        $('.post-title a').each((i, element) => aHref.push($(element).attr('href')));

        // Create an array of promises
        const promises = aHref.map(url => {
          const singleLinkToArticle = `https://blog.risingstack.com${url}`;
          return new Promise((resolve, reject) => {
            axios.get(singleLinkToArticle).then(response => {
              const $ = cheerio.load(response.data);
              if (cheerio.html($('article div p img')) === '') noImgLinks.push(singleLinkToArticle);
              resolve();
            });
          });
        });

        Promise.all(promises).then(values => {
          resolve();
        });
      });
    });
  });
  await Promise.all(articlePagePromises);
  return noImgLinks;
};