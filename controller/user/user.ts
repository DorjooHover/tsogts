import { compare, hash } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {secret} from '../../api/secret'
import { executeQuery } from '../../config/db';

   const login = async(req: NextApiRequest, res: NextApiResponse) => {
     try {
      const login:any = req.query.login == 'students' ? await executeQuery('select * from students where email = ?', [
        req.query.slug
      ]) : await executeQuery('select * from teachers where email = ?', [
        req.query.slug
      ]);
      
      if (login.length !== 0) {
        const password: any = req.query.password
      compare(password, login[0].password, async function(err, result) {
        if (!err && result ) {
          let sub = login.student_id
          if (req.query.login == 'students') {
            await executeQuery(`update students set isLogin = 1 where email = ?`,[ login[0].email])
            sub = login.student_id
          } else {
            await executeQuery(`update teachers set isLogin = 1 where email = ?`,[ login[0].email])
            sub = login.teacher_id
          }
          const claims = { sub: sub, myLoginEmail: login.email };
          const jwt = sign(claims, secret, { expiresIn: '1h' });
         
          res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
          }))
          res.json({message: 'Амжилттай нэвтэрлээ.', result: result});
        } else {
          res.json({ message: "Нэвтрэх нэр эсвэл нууц үг буруу байна.", result: result });
        }
      });
      } else {
        res.json({alert: 'Бүртгэлгүй и-майл байна.'})
      }
      
    } catch (error) {
      res.status(500).json({message: error})
    }
   }

   const getLoginStatus = async(req: NextApiRequest, res: NextApiResponse) => {
    try { 
      const data = req.query.login == 'students' ? await executeQuery(`select * from students where email = ?`, [ req.query.slug]) : await executeQuery(`select * from teachers where email = ?`, [ req.query.slug])
      res.send(data)
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  const logout = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.query.login == 'students' ? await executeQuery(`update students set isLogin = 0 where email = ?`, [req.query.slug]) : await executeQuery(`update teachers set isLogin = 0 where email = ?`, [ req.query.slug])
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  const signup = async(req: NextApiRequest, res: NextApiResponse) => {
    const {name, phone} = req.query
    try {
      const data:any = req.query.login == 'students' ? await executeQuery(`
      select * from students where email = ?
      `, [ req.query.email]) : await executeQuery(`
      select * from teachers where email = ?
      `, [ req.query.email])
      if(data.length == 0) {
        if(req.query.login == 'students') {
          hash(req.query.password, 10, async function(err, hash) {
            const statement = await executeQuery(`
            insert into students (password, email,name, phone, isLogin)
            values(?, ?,?,?, 0)
            `, [hash, req.query.email, name, phone])
            console.log(statement)
            res.status(201).json({message: 'Амжилттай бүртгүүллээ.', result: true})
          })
        } else {
          hash(req.query.password, 10, async function(err, hash) {
             await executeQuery(`
            insert into teachers (password, email, name,  address, isLogin, isTeacher)
            values(?, ?, ?, ?, 0, 0)
            `, [hash, req.query.email, name, req.query.address])
            res.status(201).json({message: 'Амжилттай бүртгүүллээ.', result: true})
          })
        }
      } else {
        res.send({message: "Бүртгэлтэй имайл байна.", result: false})
      }
    } catch (error) {
      res.status(500).json({message: error})
    }
  }
  export {login,  getLoginStatus, logout, signup}


