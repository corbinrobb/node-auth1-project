const db = require('../data/dbConfig');

const find = () => {
  return db('users');
}

const findByUsername = (username) => {
  return db('users')
    .where({ username })
    .first();
}

const add = (user) => {
  return db('users')
    .insert(user)
}

module.exports = {
  find,
  findByUsername,
  add
}