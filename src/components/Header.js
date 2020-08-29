import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//components
import Search from './Search.js';
import SearchResult from './SearchResult.js';

export default function Header(props) {
	return (
		<Router>
			<Navbar id="navbar" bg="dark" variant="dark">
				<Navbar.Brand href="/">{props.title}</Navbar.Brand>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<Link to="/search">Search</Link>
						<Link to="/favourites">Favourites</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Switch>
				<Route path="/search">
					<Search />
				</Route>
				<Route path="/favourites">
					<SearchResult
						recipes={JSON.parse(localStorage.getItem('favourites'))}
					/>
				</Route>
			</Switch>
		</Router>
	);
}
