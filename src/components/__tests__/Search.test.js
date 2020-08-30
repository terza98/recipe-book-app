import React from 'react';
import Search from '../Search';
import ReactDOM from 'react-dom';
import { render, fireEvent, getByLabelText } from '@testing-library/react';
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
	ReactDOM.render(<Search />, div);
});

it('matches snapshot', () => {
	const { asFragment } = render(<Search />);

	expect(asFragment()).toMatchSnapshot();
});

test('should submit when clicking submit button', () => {
	const handleSubmit = jest.fn();
	const { getByTestId } = render(<Search onSubmit={handleSubmit} />);

	const button = getByTestId('button');

	fireEvent.click(button);

	expect(handleSubmit).toHaveBeenCalled();
});
