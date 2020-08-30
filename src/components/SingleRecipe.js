import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// https://react-bootstrap.github.io/getting-started/introduction/#importing-components
//bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';

import ApiClient from '../api/auth-service.js';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons';

export default function SingleRecipe(props) {
	//general state
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [similarRecipes, setSimilarRecipes] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	const getSingleRecipe = id => {
		ApiClient.getSimilarRecipes(id)
			.then(result => {
				setSimilarRecipes(result.data);
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});

		return (
			ApiClient.getRecipeInformation(id)
				.then(result => {
					return result.data;
				})
				// Note: hanling errors here
				.catch(error => {
					setError(error.message);
				})
		);
	};

	useEffect(() => {
		setIsLoaded(false);

		getSingleRecipe(id)
			.then(recipe => {
				setRecipe(recipe);
			})
			// handle error + 404
			.catch(err => {})
			.finally(() => {
				setIsLoaded(true);
			});
		window.scrollTo(0, 0);
	}, [id]);

	if (!isLoaded) {
		return 'Loading...';
	} else
		return (
			<>
				<Container className="text-center">
					{recipe !== null && (
						<>
							<Row>
								{error && (
									<Alert
										variant="danger"
										onClose={() => setError('')}
										dismissible
									>
										{typeof error !== 'object' ? error : ''}
									</Alert>
								)}
								<Col xs={12} md={8} className="searchItem">
									<h3>
										<span>{recipe.title}</span>
										<FontAwesomeIcon
											className="favourite-star"
											icon={
												props.isCurrentFavourite(
													recipe.id,
												)
													? faStarFill
													: faStar
											}
											onClick={() =>
												props.addToFavourite(recipe)
											}
										/>
									</h3>
									<Image src={recipe.image} rounded />
								</Col>
								<Col
									xs={12}
									md={4}
									className="recipe-info-section"
								>
									<p>
										<span className="font-weight-bold">
											Prep:{' '}
										</span>
										{recipe.readyInMinutes} mins
									</p>
									<p>
										<span className="font-weight-bold">
											Servings:{' '}
										</span>
										{recipe.servings}{' '}
									</p>
									<p>
										<span className="font-weight-bold">
											Vegan:{' '}
										</span>
										{recipe.vegan ? 'Yes' : 'No'}{' '}
									</p>
									<p>
										<span className="font-weight-bold">
											Vegetarian:{' '}
										</span>
										{recipe.vegetarian ? 'Yes' : 'No'}{' '}
									</p>
									<p>
										<span className="font-weight-bold">
											Gluten-Free:{' '}
										</span>
										{recipe.glutenFree ? 'Yes' : 'No'}{' '}
									</p>
									<p>
										<span className="font-weight-bold">
											Health Score:{' '}
										</span>
										{recipe.healthScore}{' '}
									</p>
								</Col>
								<Col className="text-left summary">
									<div className="ingredients">
										<h4>Ingredients: </h4>
										<ul>
											{recipe.extendedIngredients.map(
												(ing, index) => (
													<li key={index}>
														{ing.original}
													</li>
												),
											)}
										</ul>
									</div>
									<div className="instructions">
										<h4>Instructions: </h4>
										<ul>
											{recipe.instructions !== null
												? recipe.instructions
														.split('. ')
														.map((inst, index) => (
															<li key={index}>
																{inst}
															</li>
														))
												: 'No instructions provided.'}
										</ul>
									</div>
									<h4
										className="text-center"
										style={{ margin: '5% 0' }}
									>
										Similar recipes:
									</h4>
									<Carousel>
										{similarRecipes.map(
											(simRecipe, index) => (
												<Carousel.Item
													className="text-center"
													key={index}
												>
													<Link
														to={`/single-recipe/${simRecipe.id}`}
													>
														<h6
															className="font-weight-bold"
															style={{
																cursor:
																	'pointer',
															}}
														>
															{simRecipe.title}
														</h6>
														<p>
															<span className="font-weight-bold">
																Prep:{' '}
															</span>
															{
																simRecipe.readyInMinutes
															}{' '}
															mins
														</p>
														<p>
															<span className="font-weight-bold">
																Servings:{' '}
															</span>
															{simRecipe.servings}{' '}
															mins
														</p>
													</Link>
												</Carousel.Item>
											),
										)}
									</Carousel>
								</Col>
							</Row>
						</>
					)}
				</Container>
			</>
		);
}
