import express, {Express}  from 'express'
import dotenv from 'dotenv';
import './db/mongoose'
import  userRouter  from './routes/user'


dotenv.config()

const Port = process.env.PORT || 5000
const app: Express = express()


app.use(express.json())

app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log('Server lsitening' +  Port)
})
