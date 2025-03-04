require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./database/dbConnection')
const router=require('./routes/router')
const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

const PORT = 3005 || process.env.PORT


server.listen(PORT,()=>{
    console.log("Server running successfully");
    console.log('http://localhost:3005');
})

server.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:blue;">My pfServer is running in port and waiting for client req!</h1>')
})