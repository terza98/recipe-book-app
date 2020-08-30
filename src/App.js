import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

//components
import Header from './components/Header.js';

function App() {
	return (
		<div className="App">
			<Header title="Recipe book app" />
			<Container fluid id="wrapper"></Container>
		</div>
	);
}

export default App;
