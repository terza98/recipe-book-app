import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header(props) {
	return (
		<Navbar id="navbar" bg="dark" variant="dark">
			<Navbar.Brand href="/search">{props.title}</Navbar.Brand>
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					<a href="/search">Search</a>
					<a href="/favourites">Favourites</a>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
