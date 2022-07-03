import { Schema, model } from 'mongoose'
import { isEmail } from 'validator';
import {compare, hash } from 'bcryptjs'
import  { sign } from 'jsonwebtoken'

interface IUser {
    
}
