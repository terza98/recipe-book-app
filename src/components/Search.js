import React, { useState, useEffect } from 'react';

//bootstrap components
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

//api
import ApiClient from '../api/auth-service.js';

//componets
import SearchResult from './SearchResult.js';

export default function Search(props) {
	const [query, changeQuery] = useState('');
	//autocomplete
	const [predictions, setPredictions] = useState([]);

	const [recipeList, setRecipes] = useState([]);
	const [showRecipes, isRecipes] = useState(false);

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
	const loadResults = () => {
		ApiClient.searchRecipes(query).then(
			result => {
				console.log(result.data.results);
				setRecipes(result.data.results);
				isRecipes(true);
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
			<>
				{!showRecipes ? (
					<Jumbotron className="banner">
						<h1>Welcome to my Recipes app!</h1>
						<p>Type your search inquiry below</p>
						{error && (
							<Alert
								variant="danger"
								onClose={() => setError('')}
								dismissible
							>
								{typeof error !== 'object' ? error : ''}
							</Alert>
						)}

						<div id="autocomplete-list">
							<input
								onChange={e => handleInputChange(e)}
								value={query}
								type="text"
								placeholder="Type in your next meal..."
								id="search"
								name="search"
							/>
							<ListGroup>
								{predictions !== undefined &&
									predictions.map((item, index) => (
										<ListGroup.Item
											onClick={() =>
												selectQuery(item.title)
											}
											key={index}
										>
											{item.title}
										</ListGroup.Item>
									))}
							</ListGroup>
						</div>
						<Button id="search-btn" onClick={loadResults}>
							Search
						</Button>
					</Jumbotron>
				) : (
					<SearchResult query={query} recipes={recipeList} />
				)}
			</>
		);
}
