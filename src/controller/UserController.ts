import { Request, Response, NextFunction } from 'express';
import knex from '../database'
import bcrypt from 'bcryptjs';

export default {
  async index(req: Request, res: Response, next: NextFunction){
    try {
      const users = await knex('users');
  
      return res.send(users)
    }catch(error){
      next(error)
    }

  },
  async create(req: Request, res: Response, next: NextFunction){
    try{
      const { username, password } = req.body;

      const user_check = (await knex('users').where('username', username)).length;

      if(user_check)
        return res.status(409).json({error: 'User already exists'});
      else if (username.length < 4)
        return res.status(406).json({error: 'Password to small'})
      else{
        const hash = await bcrypt.hash(password, 5);
  
        knex('users').insert({
          username,
          password: hash
        }).then(response => {
          console.log(response)
          return res.send('User successfully registered')
        }).catch(error => {
          new Error(error)
        })

      }

    }catch(error){
      next(error)
    }
  }
}