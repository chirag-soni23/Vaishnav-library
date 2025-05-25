import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import path from "path";
import cors from "cors";
import compression from 'compression';
import cloudinary from 'cloudinary';

dotenv.config();

// cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
})

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);

// app.get("/",(req, res) => {
//   res.send('Server is live!');
// });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
