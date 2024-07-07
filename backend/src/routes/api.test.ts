import request from 'supertest';
import express from 'express';
import apiRouter from '../routes/api';

const app = express();
app.use('/api', apiRouter);

test('GET /api/balance-sheet', async () => {
  const response = await request(app).get('/api/balance-sheet');
  expect(response.status).toBe(200);
  expect(response.body).toBeDefined();
  expect(response.body.assets).toHaveProperty('currentAssets');
});
