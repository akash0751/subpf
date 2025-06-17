const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoute = require('./routes/user')
const projectRoute = require('./routes/project')
const rateLimiter = require('./middleware/rateLimiter')
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(rateLimiter)
app.use(cors(
    ({
    origin: ["https://projectguideinfo.netlify.app",
        "https://akashpfinfos.netlify.app",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
))

app.use('/api',userRoute)
app.use('/api',projectRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to mongoDB')
})