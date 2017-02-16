'use strict'

const inquirer = require('inquirer');

function chooseDisease(diseases) {
  let diseaseNames = diseases.map(function (a) {
    return a.name
  });
  let options = [{
    type: 'list',
    name: 'myChoice',
    message: 'Izaberite:',
    choices: diseaseNames
  }];
  return inquirer.prompt(options)
    .then(answer => {
      let selectedDisease = diseases.find(disease => disease.name === answer.myChoice);
      return {name: answer.myChoice, url: selectedDisease.url};
    });
}

function getQuery() {
  let query = [{
    type: 'input',
    name: 'query',
    message: 'Unesite naziv bolesti: '
  }];
  return inquirer.prompt(query)
    .then(({query}) => query);
}

module.exports = {
  chooseDisease,
  getQuery
};
