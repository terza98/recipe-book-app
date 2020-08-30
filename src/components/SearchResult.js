import React, { useState, useEffect } from 'react';

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

export default function SearchResult(props) {
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
					<h1 style={{ marginBottom: '2%' }}>
						{window.location.href.indexOf('favourites') > -1
							? 'Favourites'
							: `Search results for query: ${props.query}`}
					</h1>
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
											props.getSingleRecipe(item.id)
										}
										src={item.image}
										rounded
									/>
									<h3>
										<span
											onClick={() =>
												props.getSingleRecipe(item.id)
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
