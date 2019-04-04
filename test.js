require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, {dbName:"test"})

test('testing nothing', ()=>{
    
})
afterAll(async () => await mongoose.disconnect());



