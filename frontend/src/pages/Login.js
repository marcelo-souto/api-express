import React from 'react';
import { UserContext } from './context/UserContext';
import useForm from './hooks/useForm';
import Sessao from './pages/Sessao';
import './styles.css';

function App() {
	const { userLogin, user, loading, error, userLogout, loggedIn } =
		React.useContext(UserContext);

	const email = useForm('email');
	const senha = useForm('senha');

	async function handleLogin(e) {
		e.preventDefault();

		if (email.validate() && senha.validate()) {
			userLogin(email.value, senha.value);
		}
	}

	if (loading) return <p>Carregando ...</p>;
	if (error) return <p>{error}</p>;
	return (
		<div className='App' style={{color: '#FFF'}}>
			{!loggedIn && <form onSubmit={handleLogin}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						name='email'
						id='email'
						{...email}
					/>
					{email.erro}
				</div>

				<div>
					<label htmlFor='senha'>Senha:</label>
					<input
						type='password'
						name='senha'
						id='senha'
						{...senha}
					/>
					{senha.erro}
				</div>
				<button>Login</button>
			</form>}
			<button onClick={userLogout}>Logout</button>

			{user && (
				<div>
					<p>{user.nome}</p>
					<p>{user.email}</p>
				</div>
			)}
		</div>
	);
}

export default App;
