const express = require('express')

const vgsUsers = require('./routes/api/vgs_users_m')
const attendancesheet = ('./routes/api/attendancesheets')
const users = require('./routes/api/users')
const awgs = require('./routes/api/awgs')
const vgs_users =require('./routes/api/vgs_users')
const events = require('./routes/api/events')
const eventforms  = require('./routes/api/eventforms')

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
    <a href="/api/Events">Events</a>`);
})

// Direct routes to appropriate files 
app.use('/api/VGS' , vgsUsers);
app.use('/api/VGS/application_form', vgsUsers)
app.use('/api/VGS/application_form_view', vgsUsers)
app.use('/api/profile', users)
app.use('/api/awgs', awgs);
 app.use('/api/VGS', vgs_users);
 app.use('/api/Events', events)
 app.use('/api/VGS/Events', vgsUsers)
 app.use('/api/Events/EventForm', events)
 app.use('/api/Events/filleventforms', events)
 
// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
})

 const port= process.env.PORT || 3000;
 app.listen(port, () => console.log(`${port} is live and running...`))