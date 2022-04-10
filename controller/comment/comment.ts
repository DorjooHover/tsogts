import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../config/db";

const getAllCommentById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const commentData = await executeQuery(`
        select * from comments
        where email = ?
        `,[req.query.slug])
        res.send(commentData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const createComment = async (req: NextApiRequest, res:NextApiResponse) => {
    let { parentId} = JSON.parse(req.body)

    const {comment} = JSON.parse(req.body)
    parentId === 0 ? parentId = null : null
    console.log(parentId,comment)
    try {
        const commentData = await executeQuery(`
        insert into comments(email, parent_id, name, comment)
        values(?, ?, ?, ?)
        `, [req.query.slug, parentId, 'adsf', comment])
        res.send(commentData)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteCommentById = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        await executeQuery(`
        delete from comments 
        where comment_id = ? and email =?
        `, [req.body, req.query.slug])
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateCommentById = async(req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body, req.query)
    const {comment, commentId} = JSON.parse(req.body) 
    try {
        await executeQuery(`
        update comments set comment = ? 
        where comment_id = ? and email = ?
        `, [comment, commentId, req.query.slug])
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export {getAllCommentById, createComment, deleteCommentById, updateCommentById}