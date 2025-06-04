
import express from 'express';
const router = express.Router();



import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

// serve up react front-end in production

export default router;
