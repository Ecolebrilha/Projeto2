const express = require('express');
const app = express();
const receitaRoutes = require('./routes/receitaRoutes');
const despesaRoutes = require('./routes/despesaRoutes');
const authRoutes = require('./routes/auth');
const cors = require('cors');
// const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, 'your_jwt_secret', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

app.use('/api', authRoutes);
// app.use('/api/receita', authenticateToken, receitaRoutes);
// app.use('/api/despesa', authenticateToken, despesaRoutes);
app.use('/api/receita', receitaRoutes);
app.use('/api/despesa', despesaRoutes);

app.listen(3005, () => {
  console.log('Servidor rodando na porta 3005!');
});
