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
	const [error, setError] = useState('');

	const [favouriteList, setFavourites] = useState([]);

	const [singleRecipe, setSingleRecipe] = useState([]);

	useEffect(() => {
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
			console.log(a);
			// Re-serialize the array back into a string and store it in localStorage
			localStorage.setItem('favourites', JSON.stringify(a));
			setFavourites(a);
		}
	};

	const isCurrentFavourite = id => {
		let isTrue = false;
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
	};
	return (
		<>
			{singleRecipe !== null && singleRecipe.length !== 0 ? (
				<SingleRecipe
					favourite={() => isCurrentFavourite(singleRecipe.id)}
					recipe={singleRecipe}
					addToFavourite={() => addToFavourite(singleRecipe)}
					showSingleRecipe={getSingleRecipe}
				/>
			) : (
				<Container className="text-center">
					<h1 style={{ marginBottom: '2%' }}>
						Search results for query: {props.query}{' '}
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
									<FontAwesomeIcon
										className="favourite-star"
										icon={
											isCurrentFavourite(item.id)
												? faStarFill
												: faStar
										}
										onClick={() => addToFavourite(item)}
									/>
									<Image
										onClick={() => getSingleRecipe(item.id)}
										src={item.image}
										rounded
									/>
									<h3
										onClick={() => getSingleRecipe(item.id)}
									>
										{item.title}
									</h3>
								</Col>
							))}
						</Row>
					)}
				</Container>
			)}
		</>
	);
}
