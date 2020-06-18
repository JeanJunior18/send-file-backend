import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import FileController from './controller/FileController'

const router = Router();
const upload = multer(multerConfig);

router
  .post('/sendpic', upload.single('picture'), FileController.store);



export default router;