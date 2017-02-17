'use strict';

const Promise = require('bluebird');
const request = require('request');
const r = Promise.promisifyAll(request.defaults());
const urlEncode = require('urlencode').encode;

const parseResult = require('./parseResult').parse;
const inquire = require('./inquire');

const baseUrl = 'http://www.plivazdravlje.hr';
const searchUrl = '/prirucnik-bolesti?plivahealth%5BchAjaxQuery%5D=';

inquire.getQuery()
  .then(result => getSearchResults(result))
  .then(({body}) => {
    let preParsed = preParse(body);
    let parsed = JSON.parse(preParsed);
    return inquire.chooseDisease(parsed)
  })
  .then(chosenDisease => {
    return getDiagnosis(chosenDisease.url);
  });

function getSearchResults(searchQuery) {
  searchQuery = urlEncode(searchQuery);
  let url = baseUrl + searchUrl + searchQuery;
  return r.getAsync(url);
}

function preParse(body) {
  if (body.includes('[{')) {
    return '[{' + body.split('[{')[1].split(']}')[0];
  } else {
    console.log('Pronađeno 0 rezultata');
    process.exit();
  }
}

function getDiagnosis(illnessUrl) {
  r.getAsync(baseUrl + illnessUrl)
    .then(({body}) => parseResult(body));
}
