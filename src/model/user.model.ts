import  { Model, Schema, HydratedDocument,  model } from 'mongoose'
import validator from 'validator';
import {compare, hash } from 'bcryptjs'
import  { sign } from 'jsonwebtoken'

 interface IUser {
    name: string
    email: string
    password: string
    tokens: string[]
    createdAt: Date
    updatedAt: Date
    generateAuthToken(): Promise<string>
}



 //statics
interface UserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>
}

const userSchema = new Schema<IUser, UserModel>({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate( value: string ) {
            if( !validator.isEmail( value )) {
                throw new Error( 'Email is invalid' )
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value: string) {
            if( value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//hide private data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Generate auth token
userSchema.methods.generateAuthToken = async function (): Promise<string> {
    const user = this
    const token = sign({ _id: user._id.toString()}, 'blogwithtype')
    user.tokens = user.tokens.concat({token})
     await user.save()
    return token
}

//login in users
userSchema.statics.findByCredentials = async (email: string, password: string): Promise<IUser> => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Email is not registered')
    }
    const isMatch = await compare(password, user.password)
    if(!isMatch) {
        throw new Error('Credentials do not match')
    }

    return user
}

//Hash plain password before saving
userSchema.pre('save', async function(next) {
    const user = this 
    if (user.isModified('password')) {
        user.password = await hash(user.password, 8)
    }

    next()
})

//delete user transactions when a user is deleted

// userSchema.pre('remove', async function(next) {
//     const user = this
//     await Transaction.deleteMany({ owner: user._id})
//     next()
// })

const User = model<IUser, UserModel>('User', userSchema);
export default User