const express = require('express')

const users = require('./Models/User')
const events = require('./Models/Event')
const AWGs = require('./Models/AWG')


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>¡AWG!</h1>
    <a href="/api/users">users</a>
    <a href="/api/events">Events</a>
    <a href="/api/AWGs">AWG</a>
    <a href="/api/MUN">MUN</a>
    `);
})

// Direct routes to appropriate files 
//app.use('/api/users', users)
//app.use('/api/books', books)

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))