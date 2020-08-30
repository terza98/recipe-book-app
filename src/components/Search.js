import React, { useState, useEffect } from 'react';

//bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Search(props) {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	if (!isLoaded) {
		return 'Loading...';
	} else
		return (
			<>
				<Jumbotron className="banner">
					<h1>Welcome to my Recipes app!</h1>
					<p>Type your search inquiry below</p>
					<Form data-testid="form" onSubmit={props.onSubmit}>
						<div id="autocomplete-list">
							<input
								onChange={props.handleInputChange}
								value={props.query}
								type="text"
								data-testid="input"
								placeholder="Type in your next meal..."
								id="search"
								name="search"
							/>
							<ListGroup>
								{props.predictions !== undefined &&
									props.predictions.map((item, index) => (
										<ListGroup.Item
											onClick={() =>
												props.selectQuery(item.title)
											}
											key={index}
										>
											{item.title}
										</ListGroup.Item>
									))}
							</ListGroup>
						</div>
						<Button
							data-testid="button"
							type="submit"
							id="search-btn"
						>
							Search
						</Button>
					</Form>
				</Jumbotron>
			</>
		);
}
