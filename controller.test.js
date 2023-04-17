// tests/controllers/users.controller.test.js
import request from 'supertest';
import app from '../../src/app.js';

describe('Users Controller', () => {
  const user = { name: 'John Doe', email: 'john.doe@example.com' };
  let createdUser;

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/users').send(user);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toMatchObject(user);
      createdUser = res.body;
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/users')
        .send({ email: 'jane.doe@example.com' });
      expect(res.statusCode).toEqual(400);
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/users')
        .send({ name: 'Jane Doe' });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toContainEqual(createdUser);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const res = await request(app).get(`/users/${createdUser.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject(createdUser);
    });

    it('should return 404 if user ID is not found', async () => {
      const res = await request(app).get('/users/nonexistent-id');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by ID', async () => {
      const res = await request(app)
        .put(`/users/${createdUser.id}`)
        .send({ name: 'Jane Doe', email: 'jane.doe@example.com' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({
        id: createdUser.id,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
    });

    it('should return 404 if user ID is not found', async () => {
      const res = await request(app)
        .put('/users/nonexistent-id')
        .send({ name: 'Jane Doe', email: 'jane.doe@example.com' });
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a usuário por ID', async () => {
    const res = await request(app).delete(/users/${createdUser.id});
    expect(res.statusCode).toEqual(204);
    });
    
    it('should return 404 if user ID is not found', async () => {
  const res = await request(app).delete('/users/nonexistent-id');
  expect(res.statusCode).toEqual(404);
});

});
});
