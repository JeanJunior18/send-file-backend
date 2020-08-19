import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      authorization: string,
      user: any
    }
  }
}

const secret = <string>process.env.SECRET_HASH;

export default (req: Request, res:Response, next: NextFunction) => {
  const { authorization } = req.headers;

  
  if(!authorization)
    return res.status(403).json({error: 'Not token Provided'});

  jwt.verify(authorization, secret, (err: any, decoded: any) => {
    if(err)
      return res.status(401).json({error: 'Invalid Token'});
    
    req.user = decoded

  })
}
