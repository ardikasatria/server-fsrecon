import express from 'express';
import { getPresignedUrl } from '../controllers/upload.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

export default function() {
  const router = express.Router();
  
  // Rute untuk mendapatkan URL unggahan
  router.post('/file', getPresignedUrl);

  return router;
}

