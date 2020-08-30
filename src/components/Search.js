import React, { useState, useEffect } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

//bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Search(props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [value, setValue] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');

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
					<Form data-testid="form" onSubmit={props.onSubmit}>
						<Autocomplete
							id="controllable-states-demo"
							options={props.predictions}
							getOptionLabel={option => option.title}
							onChange={() =>
								setTimeout(function () {
									props.selectQuery(
										document.getElementById(
											'controllable-states-demo',
										).value,
									);
								}, 200)
							}
							style={{ width: 300 }}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Type your next meal..."
									variant="outlined"
									id="query"
									value={props.query}
									onChange={props.handleInputChange}
								/>
							)}
						/>
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
