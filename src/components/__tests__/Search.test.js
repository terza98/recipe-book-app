import React from 'react';
import Search from '../Search';
import ReactDOM from 'react-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test if the app doesn't crash first
it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Search />, div);
});

it('matches snapshot', () => {
	const { asFragment } = render(<Search />);

	expect(asFragment()).toMatchSnapshot();
});
