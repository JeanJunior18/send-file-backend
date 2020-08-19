import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import auth from './services/auth';

import FileController from './controller/FileController'
import UserController from './controller/UserController'

const router = Router();
const upload = multer(multerConfig);

router
  .post('/login', UserController.authenticate)
  .get('/users', UserController.index)
  .post('/users', UserController.create)
  .post('/sendpic', upload.single('picture'), FileController.store);



export default router;