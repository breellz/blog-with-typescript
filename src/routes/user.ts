import  { IRouter, Request, Response, Router} from 'express'
import User from '../model/user.model'
import { Auth } from '../middleware/Auth'
import { IGetUserAuthInfoRequest } from '../../definitions/request_definition'

const router: IRouter =  Router()

//register users
router.post('/users', async (req: Request, res: Response) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token: string = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

//login users
router.post('/users/login',  async (req: Request, res: Response) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error: any) {
        res.status(400).send({ error: error.message})
    }
    
})

//logout 

router.post('/users/logout', Auth, async(req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const user = req.user

    } catch (error: any) {
        res.status(400).send({ error: error.message})
    }
})

export {router as userRouter}