import React from 'react';
import Header from '../Header';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Header />, div);
});

test('renders simple title', () => {
	const title = 'Example Title';
	const { getByText } = render(<Header title={title} />);
	const headerText = getByText(title);
	expect(headerText).toBeInTheDocument();
});
