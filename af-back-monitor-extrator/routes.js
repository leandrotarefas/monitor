const express = require('express');
const router = express.Router();
const ExtratorService = require("./services/ExtratorService");

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.post('/extratores', async (req, res) => {
  const nome = req.body.nome;
  await ExtratorService.save(nome);
  res.status(201).send('Extrator salvo com sucesso');
});

router.get('/extratores', async (req, res) => {
    const extratores = await ExtratorService.list();
    res.json(extratores);
});

module.exports = router;
