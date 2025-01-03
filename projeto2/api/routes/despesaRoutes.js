const express = require('express');
const route = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

route.get('/despesa', pagamentoController.listenDespesas);

route.get('/despesa/:id', pagamentoController.selectDespesasById);

route.post('/despesa', pagamentoController.insertDespesas);

route.put('/despesa/:id', pagamentoController.updateDespesa);

route.delete('/despesa/:id', pagamentoController.deleteDespesa);

module.exports = route;
