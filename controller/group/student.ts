import { NextApiResponse, NextApiRequest } from "next";
import { executeQuery } from "../../config/db";

const addStudentToGroup = async(req: NextApiRequest, res: NextApiResponse) => {
    const {groupId, studentId} = req.body.params
    try {
        const studentGroupData = await executeQuery(`
        insert into student_dashboard(student_id, group_id, is_bought)
        values(?, ?, 1)
        `, [studentId, groupId])
        res.status(201).send(studentGroupData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export {addStudentToGroup}