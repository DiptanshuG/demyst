import express from 'express';
import apiRouter from './routes/api';

const app = express();
const port = 3000;

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
