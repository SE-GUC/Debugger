require('dotenv').config() ;
const express = require('express')
const mongoose = require('mongoose')
const attendancesheet = ('./routes/api/attendancesheets')
const users = require('./routes/api/users')
const awgs = require('./routes/api/awgs')
const vgs_users =require('./routes/api/vgsUsers')
const events = require('./routes/api/events')
const eventforms  = require('./routes/api/eventforms')
const interviews = require ('./routes/api/interviews')
const headFreeSlots = require ('./routes/api/headFreeSlots')
const FAQfile = require('./routes/api/faq')
const faq = require('./routes/api/faq')
//const db = require('./node_modules/.env').mongoURI
const votes = require('./routes/api/votes')
const groups = require('./routes/api/groups')
const requests = require('./routes/api/requests')
//mongoose.connect(process.env.mongo)
//mongoose.connect(process.env.MONGO, {dbName:"test"})
mongoose.connect('mongodb+srv://mahamekdad:6gfvF79hbKVh124X@cluster0-mlucg.mongodb.net/test?retryWrites=true')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>¡AWG!</h1>
    <a href="/api/AWGs">AWGs</a>
    <a href="/api/Nebny">Nebny</a>
    <a href="/api/MUN">MUN</a>
    <a href="/api/VGS">VGS</a>
    <a href="/api/TIQ">TIQ</a>
    <a href="/api/awgs">About Clubs</a>
    <a href="/api/profile">edit or view your profile</a>
    <a href="/api/eventforms">view all eventforms</a>    
    <a href="/api/Events">Events</a>
    <a href="/api/faq">FAQ</a>` );
})

app.get('/api/FAQ', (req, res) => {
    res.send(FAQfile.FAQ);
})
// Direct routes to appropriate files 
app.use('/api/profile', users)
app.use('/api/awgs', awgs);
app.use('/api/VGS', vgs_users);
app.use('/api/Events', events)
app.use('/api/VGS/Events', vgs_users)
app.use('/api/eventforms', eventforms)
app.use('/api/Events/filleventforms', events)
app.use('/api/interviews', interviews)
app.use('/api/headFreeSlots', headFreeSlots)
app.use('/api/faq', faq)
app.use('/api/requests', requests)
app.use('/api/raise_vote', votes)
app.use('/api/groups', groups)


// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
})

 const PORT= process.env.PORT || 8000 ;

 if(process.env.NODE_ENV !== 'test'){
    const server = app.listen(PORT, () => console.log(`${PORT} is live and running...`))
    module.exports = server
}
/* const port= process.env.PORT || 8000 ;
 const server =app.listen(port, () => console.log(`${port} is live and running...`))
 //app.listen(port, ()=> console.log(`${PORT} is live and running`))
 module.exports=server*/
