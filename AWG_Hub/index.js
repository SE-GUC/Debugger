const express = require('../node_modules/express')

const users = require('./Models/User')
const events = require('./Models/Event')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Book Store</h1>
    <a href="/api/users">Users</a>
    <a href="/api/books">Events</a>
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