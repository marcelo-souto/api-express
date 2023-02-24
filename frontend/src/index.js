import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserStorage } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserStorage>
				<App />
			</UserStorage>
		</BrowserRouter>
	</React.StrictMode>
);
