const express = require('express')



const users = require('./routes/api/users')
const events = require('./Models/Event')
const AWGs = require('./Models/AWG')

const vgsUsers = require('./routes/api/vgs_users_m')
//const users = require('./routes/api/users')
const app = express()



app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>¡AWG!</h1>
    <a href="/api/AWGs">AWGs</a>
    <a href="/api/MUN">MUN</a>
    <a href="/api/VGS">VGS</a>
    <a href="/api/profile">edit or view your profile</a>
    `);
})


app.use('/api/profile', users)

// Direct routes to appropriate files 
app.use('/api/VGS' , vgsUsers)
app.use('/api/VGS/application_form', vgsUsers)
app.use('/api/VGS/application_form_view', vgsUsers)
//app.use('/api/profile', users)




// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
})


// const port = 8080
// app.listen(port, () => console.log(`Server up and running on port ${port}`))
// =======
 const port= process.env.PORT || 4000;
 app.listen(port, () => console.log(`${port} is live and running...`))

