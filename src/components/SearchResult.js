import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// https://react-bootstrap.github.io/getting-started/introduction/#importing-components
import RecipesList from './RecipesList.js';
import Alert from 'react-bootstrap/Alert';

//api
import ApiClient from '../api/auth-service.js';

export default function SearchResult(props) {
	const location = useLocation();
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(false);

	const { query } = queryString.parse(location.search);

	const loadResults = () => {
		ApiClient.searchRecipes(query)
			.then(result => {
				setRecipes(result.data.results);
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
	};

	useEffect(() => {
		loadResults();
	}, [query]);

	return (
		<>
			{error && (
				<Alert
					variant="danger"
					onClose={() => setError('')}
					dismissible
				>
					{typeof error !== 'object' ? error : ''}
				</Alert>
			)}
			<RecipesList
				heading={`Search results for query: ${query}`}
				recipes={recipes}
				isCurrentFavourite={props.isCurrentFavourite}
				addToFavourite={props.addToFavourite}
			/>
		</>
	);
}
