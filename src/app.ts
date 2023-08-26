import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import publicRoutes from './routes/publicRoutes';
import multer from 'multer';

const app = express();
const upload = multer();
dotenv.config();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  'https://setiket-fe.vercel.app/',
  'http://localhost:3000',
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

// Parse FormData in body request
app.use(upload.any());

// Public router
app.use('/api', publicRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
