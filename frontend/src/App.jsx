import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './helpers/ProtectedRoute';
import { UserStorage } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Global/Header';
import Footer from './components/Global/Footer';
import './styles/global.css';

function App() {
	return (
		<UserStorage>
			<div className='page'>
				<Header />
				<div className='content'>
					<Routes>
						<Route
							path=':nome'
							element={<HomePage />}
						/>
						<Route
							path='login/*'
							element={<LoginPage />}
						/>
						<Route
							path='dashboard'
							element={
								<ProtectedRoute>
									<DashboardPage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
				<Footer />
			</div>
		</UserStorage>
	);
}

export default App;
