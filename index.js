const express = require('express')

const vgsUsers = require('./routes/api/vgs_users_m')
const attendancesheet = ('./routes/api/attendancesheets')
const app = express()



app.use(express.json());

// Inorder to be able to use the "req.body" statement.
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>¡AWG!</h1>
    <a href="/api/AWGs">AWGs</a>
    <a href="/api/MUN">MUN</a>
    <a href="/api/VGS">VGS</a>
    <a href="/api/TIQ">TIQ</a>
    <a href="/api/awgs">Aboutt Clubss</a>
  
    <a href="/api/profile">edit or view your profile</a>
    
    <a href="/api/VGS">VGS</a>`);
})

// Direct routes to appropriate files 
app.use('/api/VGS' , vgsUsers)
app.use('/api/VGS/application_form', vgsUsers)
app.use('/api/VGS/application_form_view', vgsUsers)
app.use('/api/profile', users)
app.use('/api/awgs', awgs);
 app.use('/api/VGS', vgs_users);

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
})

 const port= process.env.PORT || 3000;
 app.listen(port, () => console.log(`${port} is live and running...`))