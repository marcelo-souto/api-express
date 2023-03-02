import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginRegister from '../components/Login/LoginRegister';
import Login from '../components/Login/Login';
import { UserContext } from '../context/UserContext';
import styles from './LoginPage.module.css'

function LoginPage() {
	const { loggedIn } = React.useContext(UserContext);

	if (loggedIn) return <Navigate to='/dashboard' />;
	return (
		<section className={styles.container}>
			<Routes>
				<Route
					path='register'
					element={<LoginRegister />}
				/>
				<Route
					path=''
					element={<Login />}
				/>
			</Routes>
		</section>
	);
}

export default LoginPage;
