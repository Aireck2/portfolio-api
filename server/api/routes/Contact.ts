import express from 'express';
import controller from '../../api/controllers/Contact';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.contact.create), controller.createContact);
router.get('/get/:contactId', controller.getContact);
router.get('/get', controller.getContacts);

export = router;
