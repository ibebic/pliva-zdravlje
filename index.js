'use strict'

const Promise = require('bluebird');
const request = require('request');
const r = Promise.promisifyAll(request.defaults({ jar: true }));

const parseResult = require('./parseResult').parse;
const inquire = require('./inquire');

const args = process.argv.slice(2);
const baseUrl = 'http://www.plivazdravlje.hr';
const searchUrl = '/prirucnik-bolesti?plivahealth%5BchAjaxQuery%5D=';
const searchQuery = args[0];

inquire.getQuery()
  .then((result) => getSearchResults(result))
  .then(({ body }) => preParse(body))
  .then((preParsed) => JSON.parse(preParsed))
  .then((result) => inquire.chooseDisease(result))
  .then((resBodyObj) => printOut(resBodyObj))
  .then((illnessUrl) => diagnosis(illnessUrl));

function getSearchResults(searchQuery) {
  let url = baseUrl + searchUrl + searchQuery;
  return r.getAsync(url);
}

function printOut(resBodyObj) {
  let result = resBodyObj[1].filter(function (obj) {
    return obj.name == resBodyObj[0];
  });
  return result[0].url;
}

function preParse(body) {
  if (body.includes('[{')) {
    return '[{' + body.split('[{')[1].split(']}')[0];
  } else {
    console.log('Pronađeno 0 rezultata');
    process.exit();
  }
}

function diagnosis(illnessUrl) {
  r.getAsync(baseUrl + illnessUrl)
    .then(({ body }) => parseResult(body));
}