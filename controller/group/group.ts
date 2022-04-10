import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../config/db";

const createGroup = async(req: NextApiRequest, res: NextApiResponse) => {
    const {id, price, title, name, description} = req.body.params
    try {
        const groupData = await executeQuery(`
        insert into l_groups(name, teacher_id, price, title, description)
        values(?,?, ?, ?, ?)
        `,[name, id, price, title, description])
        res.send(groupData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const getAllGroups = async(req:NextApiRequest, res: NextApiResponse) => {
    try {
        const teacherData = await executeQuery(`
        select * from teachers
        where isTeacher = 1
        `,[])
        const groupData = await executeQuery(`
        select * from l_groups
        inner join teachers t on t.teacher_id = l_groups.teacher_id
        `, [])
        res.send({groupData, teacherData})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateGroup = async(req:NextApiRequest, res:NextApiResponse) => {
    const {id, price, title, name, description} = req.body.params
    console.log(id, price, title, name, description)
    try {
        const groupData = await executeQuery(`
        update l_groups set name = ?, teacher_id = ?, price = ? ,title = ?, description = ?
        where group_id = ?
        `, [name, id, price, title, description, Number(req.query.pid)])
        res.send(groupData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteGroup = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        const groupData = await executeQuery(`
        delete from lesson_bundles lb
        where group_id = ?
        `, [ Number(req.query.pid)])
        if(groupData) {
            await executeQuery(`
            delete from l_groups 
            where group_id =?
            `, [Number(req.query.pid)])
        } else {
            res.json({message: 'error'})
        }
        res.send(groupData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export {createGroup, getAllGroups, updateGroup, deleteGroup}