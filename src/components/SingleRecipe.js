import React, { useState, useEffect } from 'react';

// https://react-bootstrap.github.io/getting-started/introduction/#importing-components
//bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons';

export default function SingleRecipe(props) {
	//general state
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
		window.scrollTo(0, 0);
	}, []);

	if (!isLoaded) {
		return 'Loading...';
	} else
		return (
			<>
				<Container className="text-center">
					{props.recipe !== null && props.recipe.length !== 0 && (
						<>
							{props.recipe.map((item, index) => (
								<Row key={index}>
									<Col
										xs={12}
										md={8}
										className="searchItem"
										key={index}
									>
										<h3>
											<span
												onClick={() =>
													props.showSingleRecipe(
														item.id,
													)
												}
											>
												{item.title}
											</span>
											<FontAwesomeIcon
												className="favourite-star"
												icon={
													props.isCurrentFavourite(
														item.id,
													)
														? faStarFill
														: faStar
												}
												onClick={() =>
													props.addToFavourite(item)
												}
											/>
										</h3>
										<Image src={item.image} rounded />
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
											{item.readyInMinutes} mins
										</p>
										<p>
											<span className="font-weight-bold">
												Servings:{' '}
											</span>
											{item.servings}{' '}
										</p>
										<p>
											<span className="font-weight-bold">
												Vegan:{' '}
											</span>
											{item.vegan ? 'Yes' : 'No'}{' '}
										</p>
										<p>
											<span className="font-weight-bold">
												Vegetarian:{' '}
											</span>
											{item.vegetarian ? 'Yes' : 'No'}{' '}
										</p>
										<p>
											<span className="font-weight-bold">
												Gluten-Free:{' '}
											</span>
											{item.glutenFree ? 'Yes' : 'No'}{' '}
										</p>
										<p>
											<span className="font-weight-bold">
												Health Score:{' '}
											</span>
											{item.healthScore}{' '}
										</p>
									</Col>
									<Col className="text-left summary">
										<div className="ingredients">
											<h4>Ingredients: </h4>
											<ul>
												{item.extendedIngredients.map(
													(item, index) => (
														<li key={index}>
															{item.original}
														</li>
													),
												)}
											</ul>
										</div>
										<div className="instructions">
											<h4>Instructions: </h4>
											<ul>
												{item.instructions !== null
													? item.instructions
															.split('. ')
															.map(
																(
																	item,
																	index,
																) => (
																	<li
																		key={
																			index
																		}
																	>
																		{item}
																	</li>
																),
															)
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
											{props.similarRecipes.map(
												(item, index) => (
													<Carousel.Item
														className="text-center"
														key={index}
														onClick={() =>
															props.showSingleRecipe(
																item.id,
															)
														}
													>
														<h6
															className="font-weight-bold"
															style={{
																cursor:
																	'pointer',
															}}
														>
															{item.title}
														</h6>
														<p>
															<span className="font-weight-bold">
																Prep:{' '}
															</span>
															{
																item.readyInMinutes
															}{' '}
															mins
														</p>
														<p>
															<span className="font-weight-bold">
																Servings:{' '}
															</span>
															{item.servings} mins
														</p>
													</Carousel.Item>
												),
											)}
										</Carousel>
									</Col>
								</Row>
							))}
						</>
					)}
				</Container>
			</>
		);
}
