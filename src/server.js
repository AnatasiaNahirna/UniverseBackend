import express from 'express';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import universesRoutes from './routes/universesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.json({
    limit: '100kb',
    type: ['application/json', 'application/vnd.api+json'],
  }),
);

app.use(universesRoutes);

await connectMongoDB();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
