const express = require('express');
const route = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

route.get('/receita', pagamentoController.listenReceitas);

route.get('/receita/:id', pagamentoController.selectReceitasById);

route.post('/receita', pagamentoController.insertReceitas);

route.put('/receita/:id', pagamentoController.updateReceita);

route.delete('/receita/:id', pagamentoController.deleteReceita);

module.exports = route;
