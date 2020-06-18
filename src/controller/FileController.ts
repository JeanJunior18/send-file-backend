import { Request, Response, NextFunction } from 'express'

export default {
  async store(req: Request, res: Response, next: NextFunction){
    try {
      res.send();
    } catch (error) {
      next(error);
    }
  }
}