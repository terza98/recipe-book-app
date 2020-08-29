import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

//components
import Header from './components/Header.js';
import SearchResult from './components/SearchResult';

function App() {
	return (
		<div className="App">
			<Header title="Recipe book app" />
			<Container fluid id="wrapper"></Container>
		</div>
	);
}

export default App;
