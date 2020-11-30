import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header (){

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/user">Users</a>
                </li>

            </ul>
        </nav>
    )
}
export default Header;