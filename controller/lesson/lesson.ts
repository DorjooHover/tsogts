import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../config/db";

const createLesson = async(req: NextApiRequest, res:NextApiResponse) => {
    const {video,  name, description, email} = req.body.params
    try {
        const lessonData = await executeQuery(`
        insert into lessons(video, name, description, email)
        values(?, ?, ?, ?)
        `, [video,  name, description, email])
        const lessonBundleData = await executeQuery(`
            insert into lesson_bundles(group_id, lesson_id)
            values(null ,?)
        `, [lessonData.insertId])
        res.send(lessonBundleData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const getLessonById = async(req: NextApiRequest, res:NextApiResponse) => {
    try {
        const lessonData = await executeQuery(`
        select *, lg.name as lesson_name, t.name as teacher_name from lesson_bundles lb
        inner join lessons l on l.lesson_id = lb.lesson_id 
        inner join l_groups lg on lg.group_id = lb.group_id
        inner join teachers t on t.teacher_id = lg.teacher_id
        where lb.group_id = ?
        `, [req.query.pid])
        res.send(lessonData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const getLessonByIdForTeacher = async(req: NextApiRequest, res:NextApiResponse) => {
    try {
        const lessonData = await executeQuery(`
        select * from lesson_bundles lb
        inner join lessons l on l.lesson_id = lb.lesson_id
        where email = ?
        and group_id IS NULL
        `, [req.query.slug])
        res.send(lessonData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateLessonAddGroupId = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        if(req.body.method == 'add' && req.body.id) {
            await req.body.id.map((id) => {
            executeQuery(`
            update lesson_bundles set group_id = ?
            where lesson_bundle_id = ?
            `, [req.query.slug , id])
            })
        } else {
            await req.body.id.map((id) => {
                executeQuery(`
                delete from lesson_bundles 
                where lesson_bundle_id = ?
                `, [id])
        }) 
    }
    } catch (error) {
        res.status(500).json({message: error})
    }
}


export {createLesson, getLessonById, getLessonByIdForTeacher, updateLessonAddGroupId}