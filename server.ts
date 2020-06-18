import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import router from './src/router';

const app = express();

app
  .use(cors())
  .use(router)
  .use((req:Request, res:Response, next:NextFunction)=>{
    const error:any = new Error('Not Found');
    error.status = 400
    next(error)
  })
  .use((error:any, req:Request, res:Response, next:NextFunction)=>{
    res.status(error.status || 500)
    res.json({ error: error.message })
  })
  .listen(3333, ()=>{console.log('Server is runnig');});