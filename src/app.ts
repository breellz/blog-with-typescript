import * as dotenv from 'dotenv';
import express, {Express}  from 'express'
dotenv.config()
import './db/mongoose'
import  userRouter  from './routes/user'




console.log(process.env.PORT)
console.log(`${process.env.MONGODB_URL}`)
const app: Express = express()

const Port : string = process.env.PORT

app.use(express.json())

app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log('Server lsitening' +  Port)
})
