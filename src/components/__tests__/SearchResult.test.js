import React from 'react';
import SearchResult from '../SearchResult.js';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

//test if the app doesn't crash first
it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<SearchResult />, div);
});

it('matches snapshot', () => {
	const { asFragment } = render(<SearchResult />);
	expect(asFragment()).toMatchSnapshot();
});
