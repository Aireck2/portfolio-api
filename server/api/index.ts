import express, { Router } from 'express';

import Logging from '../../helpers/logger';
import contact from '../api/routes/Contact';

const router = Router();

router.use('/contact', contact);

export default router;
