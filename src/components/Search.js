import React, { useState, useEffect } from 'react';

// https://react-bootstrap.github.io/getting-started/introduction/#importing-components
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

//bootstrap components
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

//api
import ApiClient from '../api/auth-service.js';

export default function Search(props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [query, changeQuery] = useState('');
	const [error, setError] = useState(false);

	//autocomplete
	const [predictions, setPredictions] = useState([]);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const handleInputChange = e => {
		changeQuery(e.target.value);

		ApiClient.autoCompleteSearch(e.target.value)
			.then(result => {
				setPredictions(result.data);
			})
			// Note: hanling errors here
			.catch(error => {
				setError(error.message);
			});
	};

	const selectQuery = title => {
		changeQuery(title);
		setPredictions([]);
	};

	if (!isLoaded) {
		return 'Loading...';
	} else
		return (
			<>
				<Jumbotron className="banner">
					{error && (
						<Alert
							variant="danger"
							onClose={() => setError('')}
							dismissible
						>
							{typeof error !== 'object' ? error : ''}
						</Alert>
					)}
					<h1>Welcome to my Recipe book app!</h1>
					<Form
						data-testid="form"
						onSubmit={e => {
							e.preventDefault();
							props.onSubmit(query);
						}}
					>
						<Autocomplete
							id="controllable-states-demo"
							options={predictions}
							getOptionLabel={option => option.title}
							onChange={
								() =>
									// autocomplete doesn't update input value instantly
									setTimeout(function () {
										selectQuery(
											document.getElementById(
												'controllable-states-demo',
											).value,
										);
									}, 200) //0.2 seconds was enough
							}
							style={{ width: 300 }}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Type your next meal..."
									variant="outlined"
									id="query"
									value={query}
									onChange={handleInputChange}
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
