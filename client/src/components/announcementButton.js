var React = require('react');
import {Link} from 'react-router-dom'

function Header(){
    return(
        <header style = {headerStyle}>
            <h1>Home</h1>
            <Link style = {linkStyle} to ="/announcementPage">Announcements</Link>
        </header>
    )
}
const headerStyle ={
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding:'10px'
}

const linkStyle = {
    color: '#fff',
    textDecoraction: 'none'
}

export default Header