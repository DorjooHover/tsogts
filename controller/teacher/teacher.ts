import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../config/db";

const getAllTeachers = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const teacherData = await executeQuery(`
        select * from teachers
        `, [])
        res.send(teacherData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const getGroupByTeacherId = async(req: NextApiRequest, res: NextApiResponse) => {

    try {
        const groupData = await executeQuery(`
        select * from l_groups lg
        inner join teachers t on t.teacher_id = lg.teacher_id
        where email = ?
        `, [req.query.slug[0]])
        res.send(groupData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteTeacher = async(req: NextApiRequest, res:NextApiResponse) => {
    const pid = Number(req.query.pid)
    try {
        const teacherData = await executeQuery(`
        delete from teachers 
        where teacher_id = ?
        `, [pid])
        res.send(teacherData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateTeacher = async(req: NextApiRequest, res: NextApiResponse) => {
    const pid = Number(req.query.pid)
    try {
        const teacherData = await executeQuery(`
        update teachers set isTeacher = 1 where teacher_id = ?
        `, [pid])
        res.send(teacherData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export {getAllTeachers, deleteTeacher, updateTeacher, getGroupByTeacherId}