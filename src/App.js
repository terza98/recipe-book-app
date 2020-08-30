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

	const [favouriteList, setFavourites] = useState([]);

	const [singleRecipe, setSingleRecipe] = useState([]);

	const [similarRecipes, setSimilarRecipes] = useState([]);

	useEffect(() => {
		setIsLoaded(true);
		setFavourites(JSON.parse(localStorage.getItem('favourites')));
	}, []);

	const handleInputChange = e => {
		changeQuery(e.target.value);

		ApiClient.autoCompleteSearch(e.target.value)
			.then(result => {
				setPredictions(result.data);
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
	};

	const selectQuery = title => {
		console.log(title);
		changeQuery(title);
		setPredictions([]);
	};

	const loadResults = e => {
		e.preventDefault();
		ApiClient.searchRecipes(query)
			.then(result => {
				setRecipes(result.data.results);
				history.push({
					pathname: '/search-results',
					search: `?query=${query}`,
				});
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
	};

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

	const getSingleRecipe = id => {
		ApiClient.getRecipeInformation(id)
			.then(result => {
				setSingleRecipe([result.data]);
				history.push({
					pathname: '/single-recipe',
					search: `?name=${result.data.title}`,
				});
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
		ApiClient.getSimilarRecipes(id)
			.then(result => {
				setSimilarRecipes(result.data);
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
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
								render={() => (
									<SearchResult
										query={query}
										recipes={recipeList}
										isCurrentFavourite={isCurrentFavourite}
										addToFavourite={addToFavourite}
										getSingleRecipe={getSingleRecipe}
									/>
								)}
							/>
							<Route
								path="/single-recipe"
								component={() => (
									<SingleRecipe
										favourite={() =>
											isCurrentFavourite(singleRecipe.id)
										}
										recipe={singleRecipe}
										addToFavourite={() =>
											addToFavourite(singleRecipe)
										}
										showSingleRecipe={getSingleRecipe}
										similarRecipes={similarRecipes}
									/>
								)}
							/>

							<Route path="/favourites">
								<SearchResult
									recipes={JSON.parse(
										localStorage.getItem('favourites'),
									)}
									isCurrentFavourite={isCurrentFavourite}
									addToFavourite={addToFavourite}
									getSingleRecipe={getSingleRecipe}
								/>
							</Route>
						</Switch>
					</Container>
				</Router>
			</div>
		);
}

export default App;
