// controllers/upload.controller.js
import { createPresignedPost } from '../services/aws.service.js';

export const getPresignedUrl = async (req, res) => {
  try {
    const { key, content_type } = req.body;
    const result = await createPresignedPost({ key, contentType: content_type });
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get presigned URL', error: err.message });
  }
};
