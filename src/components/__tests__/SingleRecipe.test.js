import React from 'react';
import SingleRecipe from '../SingleRecipe.js';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

//test if the app doesn't crash first
it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<SingleRecipe />, div);
});

it('matches snapshot', () => {
	const { asFragment } = render(<SingleRecipe />);

	expect(asFragment()).toMatchSnapshot();
});
