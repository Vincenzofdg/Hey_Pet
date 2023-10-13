const { Router } = require('express');
const { rescue: controller } = require('../controllers');
const { token } = require('../middlewares');

const { getAll, getById, update, create, destroy } = controller;

const rescue = Router();

rescue
    .get('/', [token, getAll])
    .get('/:id', [token, getById])
    .put('/:id', [token, update])
    .post('/', [token, create])
    .delete('/:id', [token, destroy])

module.exports = rescue;