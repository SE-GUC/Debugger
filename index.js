const express = require('express')


/*const users = require('./Models/User')
const events = require('./Models/Event')
const AWGs = require('./Models/AWG')*/
const attendanceSheets = require('./routes/api/attendanceSheets')

const users = require('./routes/api/users')
//const events = require('./Models/Event')
const AWGs = require('./Models/AWG')

const vgsUsers = require('./routes/api/vgs_users_m')
//const users = require('./routes/api/users')

const events = require('./routes/api/events')
const eventforms  = require('./routes/api/eventforms')


const awgs = require('./routes/api/awgs')
const vgs_users =require('./routes/api/vgs_users')

const interviewSlot = require ('./routes/api/interviewSlots')
const announcement = require ('./routes/api/announcements')
const app = express()

// Inorder to be able to use the "req.body" statement.
app.use(express.json())

app.get('/', (req, res) => {


app.use(express.json())



/*app.get('/', (req, res) => {

    res.send(`<h1>¡AWG!</h1>
    <a href="/api/users">Users</a>
    <a href="/api/events">Events</a>
    <a href="/api/AWGs">AWGs</a>
    <a href="/api/MUN">MUN</a>


    `);
})

// Direct routes to appropriate files 
//app.use('/api/users', users)
//app.use('/api/books', books)
app.use ('/api/attendance',attendanceSheets)

// Handling 404
    <a href="/api/announcements">announcements</a>
    <a href="/api/interviewSlot">interviewSlot</a>`);


    <a href="/api/Events">Events</a>`);
});
    <a href="/api/TIQ">TIQ</a>
    <a href="/api/awgs">About Clubs</a>
    <a href="/api/profile">edit or view your profile</a>
    `);*/
})

app.get('/', (req, res) => {
    res.send(`<h1>¡AWG!</h1>
    <a href="/api/Nebny">Nebny</a>
    <a href="/api/MUN">MUN</a>
    <a href="/api/VGS">VGS</a>
    <a href="/api/announcements">announcements</a>
    <a href="/api/interviewSlot">interviewSlot</a>
    <a href="/api/Events">Events</a>`);
    <a href="/api/TIQ">TIQ</a>
    <a href="/api/awgs">About Clubs</a>
    <a href="/api/profile">edit or view your profile</a>`)})



app.use('/api/profile', users)

// Direct routes to appropriate files 
app.use('/api/VGS' , vgsUsers)
app.use('/api/VGS/application_form', vgsUsers)
app.use('/api/VGS/application_form_view', vgsUsers)
app.use('/api/interviewSlots', interviewSlot)
app.use('/api/announcements', announcement)
//app.use('/api/profile', users)

app.use('/api/Events', events)
app.use('/api/VGS/Events', vgsUsers)
app.use('/api/Events/EventForm', events)
app.use('/api/Events/filleventforms', events)


app.use('/api/profile', users)
app.use('/api/awgs', awgs);
app.use('/api/VGS', vgs_users);


app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })



 const port= process.env.PORT || 4000;
 app.listen(port, () => console.log(`${port} is live and running...`))

