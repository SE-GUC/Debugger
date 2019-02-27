
const express = require('../node_modules/express')

//const users = require('./Models/User')
//const events = require('./Models/Event')

//sherry first user story 
const VGS = require('./Models/VGS')
const Nebny = require('./Models/Nebny')
const TIQ = require('./Models/TIQ')
const MUN = require('./Models/MUN')

const app = express()
app.use(express.json())

//msh 3rfa a3mlhm comment (users and books)

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to GUC Clubs </h1>
    
    <a href="/api/users">Users</a> 
    <a href="/api/books">Events</a> 

    <a href="/api/VGS">VGS</a>
      <a href="/api/Nebny">Nebny</a>
      <a href="/api/TIQ">TIQ</a>
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