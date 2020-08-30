import React from 'react';
import SingleRecipe from '../SingleRecipe.js';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<SingleRecipe />, div);
});
