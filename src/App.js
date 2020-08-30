import React, { useState, useEffect } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

//components
import Header from './components/Header.js';
import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';

//api
import ApiClient from './api/auth-service.js';

function App() {
	const [recipeList, setRecipes] = useState([]);

	const [query, changeQuery] = useState('');
	//autocomplete
	const [predictions, setPredictions] = useState([]);

	//general state
	const [error, setError] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const handleInputChange = e => {
		changeQuery(e.target.value);

		//uncoment when start giving solution
		// ApiClient.autoCompleteSearch(e.target.value)
		// 	.then(result => {
		// 		setPredictions(result.data);
		// 	})
		// 	// Note: hanling errors here
		// 	.catch(error => {
		// 		setError(error.message);
		// 	});
	};

	const selectQuery = title => {
		changeQuery(title);
		setPredictions([]);
	};

	const loadResults = e => {
		e.preventDefault();
		ApiClient.searchRecipes(query).then(
			result => {
				setRecipes(result.data.results);
				history.push({
					pathname: '/search-results',
					search: `?query=${query}`,
				});
			},
			// Note: hanling errors here
			error => {
				setError(error.message);
			},
		);
	};
	if (!isLoaded) {
		return 'Loading...';
	} else
		return (
			<div className="App">
				<Router history={history}>
					<Header title="Recipe book app" />
					<Container fluid id="wrapper">
						{error && (
							<Alert
								variant="danger"
								onClose={() => setError('')}
								dismissible
							>
								{typeof error !== 'object' ? error : ''}
							</Alert>
						)}
						<Switch>
							<Route
								exact
								path="/search"
								render={() => (
									<Search
										predictions={predictions}
										query={query}
										handleInputChange={e =>
											handleInputChange(e)
										}
										selectQuery={selectQuery}
										onSubmit={loadResults}
									/>
								)}
							/>
							<Route
								path="/search-results"
								component={() => (
									<SearchResult
										query={query}
										recipes={recipeList}
									/>
								)}
							/>

							<Route path="/favourites">
								<SearchResult
									recipes={JSON.parse(
										localStorage.getItem('favourites'),
									)}
								/>
							</Route>
						</Switch>
					</Container>
				</Router>
			</div>
		);
}

export default App;
