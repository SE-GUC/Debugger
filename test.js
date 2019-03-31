require('dotenv').config()
const mongoose = require('mongoose')

//mongoose.connect(process.env.MONGO, {dbName:"test"})
mongoose.connect('mongodb+srv://mahamekdad:6gfvF79hbKVh124X@cluster0-mlucg.mongodb.net/test?retryWrites=true')

test('testing nothing', ()=>{

})
afterAll(async () => await mongoose.disconnect()) ;