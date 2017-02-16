'use strict'

const cheerio = require('cheerio');

function parse(body) {
  let $ = cheerio.load(body);
  let format = $('.article-container').text();
  format = format.replace(/  +/g,' ');
  format = format.replace(/\t+/g,'');
  format = format.replace(/\n\n\n+/g,'\n\n');
  console.log(format);
}

module.exports = {
  parse
}

