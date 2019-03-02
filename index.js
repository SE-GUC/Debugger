const express = require('express')

const users = require('./Models/User')
const events = require('./Models/Event')
const awgs = require('./routes/api/awgs')
const vgs_users =require('./routes/api/vgs_users')

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to GUC Clubs!</h1>
    <a href="/api/Nebny">Nebny</a>
    <a href="/api/MUN">MUN</a>
    <a href="/api/VGS">VGS</a>
    <a href="/api/TIQ">TIQ</a>
    <a href="/api/awgs">About Clubs </a>
    `);
})



 app.use('/api/awgs', awgs);
 app.use('/api/VGS', vgs_users);




// Handling 404
app.use((req, res) => {
 res.status(404).send({err: 'We can not find what you are looking for'});
 })

 
const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))