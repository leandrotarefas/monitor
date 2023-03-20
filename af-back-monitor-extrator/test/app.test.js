const moment = require("moment");
const request = require('supertest');
const ExtratorModel = require("../models/ExtratorModel");
let app;

beforeAll(async () => {
  const mongo_url = 'mongodb://tarefas:tarefas@localhost:27017/monitorUnit'
  require("../infra/db").connect(mongo_url);
  await ExtratorModel.deleteMany();

  app = require('../server')();
  app = app.listen(3001);
});

afterAll(async () => {
  require("../infra/db").disconnect();
  app.close();
});

describe('Testes para POST na aplicação do AF Back Monitor', () => {

  it('Deve salvar um extrator 1 com sucesso', async () => {
    const response = await request(app)
      .post('/extratores')
      .send({ nome: 'Extrator POST1' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Extrator salvo com sucesso');
  });

  it('Deve atualizar um extrator 1 com sucesso', async () => {
    const response = await request(app)
      .post('/extratores')
      .send({ nome: 'Extrator POST1' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Extrator salvo com sucesso');
  });

});

describe('Testes para GET na aplicação do AF Back Monitor', () => {

  it('Deve listar o extrator salvo', async () => {

    await request(app)
      .post('/extratores')
      .send({ nome: 'Extrator GET1' });

    const response = await request(app).get('/extratores');
    expect(response.status).toBe(200);
  });

  it('Deve lista o extrator atrasado', async () => {

    await ExtratorModel.deleteMany();

    await request(app)
      .post('/extratores')
      .send({ nome: 'Extrator GET2' });

    const dataAnterior = moment().subtract(1, 'day').toDate();

    const update = { $set: { dataRecebimento: dataAnterior } };
    await ExtratorModel.updateMany({ nome: 'Extrator GET2' }, update);

    const response = await request(app).get('/extratores');
    expect(response.status).toBe(200);
  });

  it('Deve consultar uma base de dados vazia', async () => {
    await ExtratorModel.deleteMany();
    const response = await request(app).get('/extratores');
    expect(response.status).toBe(200);
  });

});

