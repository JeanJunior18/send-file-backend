import { Request, Response, NextFunction } from 'express'

export default {
  async index(req: Request, res: Response, next: NextFunction){

  },
  async store(req: Request, res: Response, next: NextFunction){
    try {
      res.send(req.file);
    } catch (error) {
      next(error);
    }
  }
}