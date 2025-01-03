const express = require('express');
const app = express();
const receitaRoutes = require('./routes/receitaRoutes');
const despesaRoutes = require('./routes/despesaRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api', receitaRoutes);
app.use('/api', despesaRoutes);

app.listen(3005, () => {
  console.log('Servidor rodando na porta 3005!');
});
