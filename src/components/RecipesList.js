import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// https://react-bootstrap.github.io/getting-started/introduction/#importing-components

//bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons';

export default function RecipesList(props) {
	//general state
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	if (!isLoaded) {
		return 'Loading...';
	} else
		return (
			<>
				<Container className="text-center">
					<h1 style={{ marginBottom: '2%' }}>{props.heading}</h1>
					{props.recipes !== null && (
						<Row>
							{props.recipes.map((item, index) => (
								<Col
									className="searchItem"
									key={index}
									xs={12}
									md={4}
								>
									<Link to={`/single-recipe/${item.id}`}>
										<Image src={item.image} rounded />
									</Link>
									<h3>
										<Link to={`/single-recipe/${item.id}`}>
											<span>{item.title}</span>
										</Link>

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
									<p>
										<span className="font-weight-bold">
											Prep:{' '}
										</span>
										{item.readyInMinutes} mins
									</p>
								</Col>
							))}
						</Row>
					)}
				</Container>
			</>
		);
}
