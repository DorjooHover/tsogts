import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../config/db";
import { hash } from "bcrypt";
const studentDashboard = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = await executeQuery(`
        select *, t.name as teacher_name, lg.name as lesson_name from lesson_bundles lb
        inner join l_groups lg on lg.group_id = lb.group_id
        inner join lessons l on l.lesson_id = lb.lesson_id
        inner join teachers t on t.teacher_id = lg.teacher_id
        `,[])
        res.send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const studentCourse = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = await executeQuery(`
        select *, t.name as teacher_name, lg.name as lesson_name from student_dashboard sd
        inner join lesson_bundles lb on lb.group_id = sd.group_id
        inner join lessons l on l.lesson_id = lb.lesson_id
        inner join l_groups lg on lg.group_id = lb.group_id
        inner join teachers t on t.teacher_id = lg.teacher_id
        where student_id = ? and is_bought = 1
        `, [req.query.pid])
        res.send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteStudent = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const studentData = await executeQuery(`
        update students set email = null
        where student_id = ?
        `, [req.query.pid])
        res.send(studentData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateStudent = async(req: NextApiRequest, res: NextApiResponse) => {
    const {pid, email, name, password, phone} = req.query
    try {
        hash(password, 10, async function(err, hash) {
            const statement = await executeQuery(`
            update students set email = ?, name = ?, password = ?, phone = ?
            where student_id = ?
            `, [email, name, hash , phone, pid])
            res.status(200).send(statement)
          })
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const getAllStudents = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const studentData = await executeQuery(`
        select * from students
        where email is not NULL
        `,[])
        res.send(studentData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const createStudentDashboard = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        await req.body.id.map((id) => {
            if (req.body.method == 'add') {
                executeQuery(`
                insert into student_dashboard(student_id, group_id, is_bought)
                values(? ,? ,1)
                `, [id, req.query.pid])
            } else {
                executeQuery(`
                update student_dashboard set is_bought = 0
                where student_id = ? and group_id = ?
                `, [id, req.query.pid])
            }
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export {studentDashboard,createStudentDashboard, studentCourse, deleteStudent, updateStudent, getAllStudents}