import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

//components
import Favourites from './Favourites.js'
import Search from './Search.js'
import Home from './Home.js'

export default function Header(props){
    return(
        <Router>
            <Navbar id="navbar" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    {props.title}
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/search">Search recipes</Link>
                        <Link to="/favourite">Favourite recipes</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                <Route path="/favourites">
                    <Favourites />
                </Route>
            </Switch>
        </Router>
    );
}