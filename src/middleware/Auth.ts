import * as jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import User from '../model/user.model'
import {IGetUserAuthInfoRequest} from '../../definitions/request_definition'

const userAuth = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const token: string = req.header('Authorization').replace('Bearer ', '')
        const decoded  = <any>jwt.verify(token, 'bankingapi')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: "You are not authenticated as a user" })
    }
}

module.exports = userAuth
