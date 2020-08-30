import React, { useState, useEffect } from 'react';

//bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons';

//components
import SingleRecipe from './SingleRecipe.js';

//api
import ApiClient from '../api/auth-service.js';

export default function SearchResult(props) {
	const [favouriteList, setFavourites] = useState([]);

	const [singleRecipe, setSingleRecipe] = useState([]);

	const [similarRecipes, setSimilarRecipes] = useState([]);

	//general state
	const [error, setError] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

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

	const getSingleRecipe = id => {
		ApiClient.getRecipeInformation(id)
			.then(result => {
				setSingleRecipe([result.data]);
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
			<>
				{singleRecipe !== null && singleRecipe.length !== 0 ? (
					<SingleRecipe
						favourite={() => isCurrentFavourite(singleRecipe.id)}
						recipe={singleRecipe}
						addToFavourite={() => addToFavourite(singleRecipe)}
						showSingleRecipe={getSingleRecipe}
						similarRecipes={similarRecipes}
					/>
				) : (
					<Container className="text-center">
						<h1 style={{ marginBottom: '2%' }}>
							{window.location.href.indexOf('favourites') > -1
								? 'Favourites'
								: `Search results for query: ${props.query}`}
						</h1>
						{error && (
							<Alert
								variant="danger"
								onClose={() => setError('')}
								dismissible
							>
								{typeof error !== 'object' ? error : ''}
							</Alert>
						)}
						{props.recipes !== null && (
							<Row>
								{props.recipes.map((item, index) => (
									<Col
										className="searchItem"
										key={index}
										xs={12}
										md={4}
									>
										<Image
											onClick={() =>
												getSingleRecipe(item.id)
											}
											src={item.image}
											rounded
										/>
										<h3>
											<span
												onClick={() =>
													getSingleRecipe(item.id)
												}
											>
												{item.title}
											</span>
											<FontAwesomeIcon
												className="favourite-star"
												icon={
													isCurrentFavourite(item.id)
														? faStarFill
														: faStar
												}
												onClick={() =>
													addToFavourite(item)
												}
											/>
										</h3>
										{window.location.href.indexOf(
											'favourites',
										) > -1 && (
											<p>
												<span className="font-weight-bold">
													Prep:{' '}
												</span>
												{item.readyInMinutes} mins
											</p>
										)}
									</Col>
								))}
							</Row>
						)}
					</Container>
				)}
			</>
		);
}
