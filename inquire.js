'use strict'

const inquirer = require('inquirer');

function chooseDisease(result) {
  let diseases = result.map(function (a) { return a.name });
  let options = [{
    type: 'list',
    name: 'myChoice',
    message: 'Izaberite:',
    choices: diseases
  }];
  return inquirer.prompt(options)
    .then(answers => [answers.myChoice, result]);
}

function getQuery() {
  let query = [{
    type: 'input',
    name: 'query',
    message: 'Unesite bolest ili simptom: '
  }];
  return inquirer.prompt(query)
    .then(({ query }) => query);
}

module.exports = {
  chooseDisease,
  getQuery
}