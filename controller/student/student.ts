import { compare, hash } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {secret} from '../../api/secret'
import { executeQuery } from '../../config/db';

   const login = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
      const student:any = await executeQuery('select * from students where email = ?', [
        req.query.slug
      ]);
      const password: any = req.query.password
      compare(password, student[0].password, async function(err, result) {
        if (!err && result ) {
          await executeQuery(`update students set isLogin = 1 where email = ?`,[student[0].email])
          const claims = { sub: student.student_id, myStudentEmail: student.email };
          const jwt = sign(claims, secret, { expiresIn: '1h' });
         
          res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
          }))
          res.json({message: 'Welcome back to the app!', result: result});
        } else {
          res.json({ message: {password}, result: result });
        }
      });
    } catch (error) {
      res.status(500).send(req.body)
    }
   }

   const getStudentStatus = async(req: NextApiRequest, res: NextApiResponse) => {
    try { 
      const data = await executeQuery(`select * from students where email = ?`, [req.query.slug])
      res.send(data)
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  const logout = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
      await executeQuery(`update students set isLogin = 0 where email = ?`, [req.query.slug])
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  const signup = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data:any = await executeQuery(`
      select * from students where email = ?
      `, [req.query.email])
      if(data.length == 0) {
        hash(req.query.password, 10, async function(err, hash) {
          const statement = await executeQuery(`
          insert into students (password, email, isLogin)
          values(?, ?, 0)
          `, [hash, req.query.email])
          res.status(201).send(statement)
        })
      } else {
        res.send({message: "Бүртгэлтэй имайл байна."})
      }
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  export {login,  getStudentStatus, logout, signup}


