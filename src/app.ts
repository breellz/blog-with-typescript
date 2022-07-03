import express, {Express}  from 'express'
import dotenv from 'dotenv';
import './db/mongoose'


dotenv.config()

const app: Express = express()


app.listen(process.env.PORT, () => {
    console.log('Server lsitening')
})
