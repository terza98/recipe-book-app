import React from 'react';
// https://react-bootstrap.github.io/getting-started/introduction/#importing-components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
	return (
		<Navbar id="navbar" bg="dark" variant="dark">
			<Navbar.Brand href="/search">{props.title}</Navbar.Brand>
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					<Link to="/search">Search</Link>
					<Link to="/favourites">Favourites</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
