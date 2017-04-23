'use strict';

const _ = require('lodash');
const users = [
  {
    name: 'aaa',
    password: '111'
  },
  {
    name: 'bbb',
    password: '222'
  },
  {
    name: 'wiesiek',
    password: '1234'
  },
  {
    name: 'janusz',
    password: '4321'
  }
];

module.exports = {
  login(login, password) {
    return new Promise((resolve, reject) => {
      const found = _.find(users, usr => {
        return usr.name === login;
      });

      if(!found) {
        resolve(false);
      }

      if(found.password === password) {
        resolve(found);
      }

      resolve(false);
    });
  }
}