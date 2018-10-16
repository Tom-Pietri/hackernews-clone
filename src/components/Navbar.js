import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return(
            <nav>
                <Link to='/'>Home</Link>
                <span> | </span>
                <Link to='/newest'>New</Link>
                <span> | </span>
                <Link to='/show'>Show</Link>
                <span> | </span>
                <Link to='/ask'>Ask</Link>
            </nav>
        )
    }
}

export default Navbar;