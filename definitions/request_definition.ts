import { Request } from "express"
import  {IUser} from '../src/model/user.model'

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser
  token: string
}