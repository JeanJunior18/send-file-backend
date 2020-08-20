import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import knex from '../database'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface User {
  id: number
  username: string
  password: string
}

const secret = <string>process.env.SECRET_HASH;

function generateToken(params={}){
  return jwt.sign(params, secret)
}

export default {
  async authenticate(req: Request, res: Response, next: NextFunction){
    try{
      const { username, password } = req.body;

      const user = await knex<User>('users').where('username', username).first();

      if (!user)
        return res.status(401).json({error: 'Username not registered'})

      if( await bcrypt.compare(password, user.password) ){
        user['password'] = '';
        const user_id = user.id
        const authorization = generateToken({username, user_id})
        return res.json({authorization})
      } 
    }catch(error){
      next(error)
    }
  },
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
        }).then(() => {
          return res.json('User successfully registered')
        }).catch(error => {
          new Error(error)
        })

      }

    }catch(error){
      next(error)
    }
  }
}