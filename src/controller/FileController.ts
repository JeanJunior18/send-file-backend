import { Request, Response, NextFunction } from 'express'
import knex from '../database';

export default {
  async index(req: Request, res: Response, next: NextFunction){
    try{
      const { user_id } = req.user;
      const userData = await knex('users')
      .where('users.id', user_id)
      .join('images','users.id', '=', 'images.user_id')
      .select('users.id', 'images.filename', 'images.originalname')

      return res.json(userData);
    }catch(error){
      next(error)
    }
  },
  async store(req: Request, res: Response, next: NextFunction){
    try {
      const { user_id } = req.user;
      const { filename, originalname } = req.file;

      await knex('images').insert({
        filename,
        originalname,
        user_id,
      })

      return res.json(originalname);
    } catch (error) {
      next(error);
    }
  }
}