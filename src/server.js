import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

import universesRoutes from './routes/universesRoutes.js';
import usersRoutes from './routes/usersRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.json({
    limit: '100kb',
    type: ['application/json', 'application/vnd.api+json'],
  }),
);
app.use(cors());
app.use(logger);
await connectMongoDB();

app.use(universesRoutes);
app.use(usersRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
