const express = require('../../node_modules/express')

const User = require('../Models/User')

const app = express()
app.use(express.json())

const someUsers = [
    new User('maha', 1235, 'test_Efe@kks.com', 24578, '15/2/1997', '3rd', 'bus', 'nsns-street', 'Ihlam'),
    new User('salma', 6789, 'test2_foo@kks.com', 98325, '09/10/1995', '3rd', 'bus', 'nien-street', 'VGS')
]


/*app.get('/', function (Request , Response){
    Response.send(`<h2>Hey<h2> <a href="/"`)
})*/

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Book Store</h1>
    <a href="/api/users">Users</a>
    <a href="/api/books">Books</a>
    `);
})

app.get()

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))