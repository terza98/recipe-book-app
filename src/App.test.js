import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//test if the app doesn't crash first
it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});
