import { Request } from "express"
import  {IUser} from '../src/model/user.model'

export interface IGetUserAuthInfoRequest extends Request {
  user: any
  token: string
}