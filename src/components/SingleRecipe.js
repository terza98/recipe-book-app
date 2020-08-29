import React, { useState, useEffect } from 'react';

//bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons';

//api
import ApiClient from '../api/auth-service.js';

export default function SingleRecipe(props) {
	const [error, setError] = useState('');
	const [recipe, setFavourites] = useState([]);

	const [similarRecipes, setSimilarRecipes] = useState([]);

	useEffect(() => {
		ApiClient.getSimilarRecipes(props.recipe[0].id)

			.then(result => {
				setSimilarRecipes([result.data]);
				console.log(result.data);
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
	}, []);

	return (
		<>
			<Container className="text-center">
				<h1 style={{ marginBottom: '2%' }}></h1>
				{error && (
					<Alert
						variant="danger"
						onClose={() => setError('')}
						dismissible
					>
						{typeof error !== 'object' ? error : ''}
					</Alert>
				)}
				{props.recipe !== null && props.recipe.length !== 0 && (
					<>
						{props.recipe.map((item, index) => (
							<Row key={index}>
								<Col
									xs={12}
									md={9}
									className="searchItem"
									key={index}
								>
									<FontAwesomeIcon
										className="favourite-star"
										icon={
											props.favourite(item.id)
												? faStarFill
												: faStar
										}
										onClick={props.addToFavourite}
									/>
									<h3>{item.title}</h3>
									<Image src={item.image} rounded />
								</Col>
								<Col
									xs={12}
									md={3}
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
								</Col>
								<Col className="summary" className="text-left">
									<div className="instructions">
										<h4>Instructions: </h4>
										<ul>
											{item.instructions
												.split('. ')
												.map((item, index) => (
													<li key={index}>{item}</li>
												))}
										</ul>
									</div>
								</Col>
							</Row>
						))}
						<Row>
							<Carousel>
								{similarRecipes !== null &&
									similarRecipes.length !== 0 && (
										<>
											{similarRecipes.map(
												(item, index) => (
													<Carousel.Item key={index}>
														<Carousel.Caption>
															<h3
																onClick={() =>
																	props.showSingleRecipe(
																		item.id,
																	)
																}
															>
																{item.title}
															</h3>
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
																{item.servings}{' '}
																mins
															</p>
														</Carousel.Caption>
													</Carousel.Item>
												),
											)}
										</>
									)}
							</Carousel>
						</Row>
					</>
				)}
			</Container>
		</>
	);
}
