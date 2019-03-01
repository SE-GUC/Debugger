const express = require('express')

const vgsUsers = require('./routes/api/vgs_users_m')

const app = express()

// Inorder to be able to use the "req.body" statement.
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>¡AWG!</h1>
    <a href="/api/AWGs">AWGs</a>
    <a href="/api/MUN">MUN</a>
    <a href="/api/VGS">VGS</a>`);
})

// Direct routes to appropriate files 
app.use('/api/VGS' , vgsUsers)
app.use('/api/VGS/application_form', vgsUsers)


// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
})

 const port= process.env.PORT || 3000;
 app.listen(port, () => console.log(`${port} is live and running...`))