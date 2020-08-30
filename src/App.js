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
import SingleRecipe from './components/SingleRecipe.js';
import RecipesList from './components/RecipesList.js';

function App() {
	//general state
	const [error, setError] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	const [favouriteList, setFavourites] = useState([]);

	useEffect(() => {
		setIsLoaded(true);
		setFavourites(JSON.parse(localStorage.getItem('favourites')));
	}, []);

	const addToFavourite = item => {
		let a;
		//is anything in localstorage?
		if (localStorage.getItem('favourites') === null) {
			a = [];
		} else {
			// Parse the serialized data back into an array of objects
			a = JSON.parse(localStorage.getItem('favourites'));
		}
		// Push the new data onto the array
		if (!isCurrentFavourite(item.id)) {
			a.push(item);
			// Re-serialize the array back into a string and store it in localStorage
			localStorage.setItem('favourites', JSON.stringify(a));
			setFavourites(a);
		} else {
			for (let i = 0; i < a.length; i++) {
				if (a[i].id === item.id) a.splice(i, 1);
			}
			// Re-serialize the array back into a string and store it in localStorage
			localStorage.setItem('favourites', JSON.stringify(a));
			setFavourites(a);
		}
	};

	const isCurrentFavourite = id => {
		let isTrue = false;
		if (favouriteList !== null)
			for (let i = 0; i < favouriteList.length; i++) {
				if (favouriteList[i].id === id) {
					isTrue = true;
					break;
				}
			}
		return isTrue;
	};

	const handleSubmit = query => {
		history.push(`/search-results?query=${query}`);
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
								path="/"
								render={() => (
									<Search onSubmit={handleSubmit} />
								)}
							/>
							<Route
								exact
								path="/search"
								render={() => (
									<Search onSubmit={handleSubmit} />
								)}
							/>
							<Route
								path="/search-results"
								render={() => (
									<SearchResult
										isCurrentFavourite={isCurrentFavourite}
										addToFavourite={addToFavourite}
									/>
								)}
							/>
							<Route
								path="/single-recipe/:id"
								component={() => (
									<SingleRecipe
										isCurrentFavourite={isCurrentFavourite}
										addToFavourite={addToFavourite}
									/>
								)}
							/>

							<Route path="/favourites">
								<RecipesList
									recipes={JSON.parse(
										localStorage.getItem('favourites'),
									)}
									isCurrentFavourite={isCurrentFavourite}
									addToFavourite={addToFavourite}
								/>
							</Route>
						</Switch>
					</Container>
				</Router>
			</div>
		);
}

export default App;
