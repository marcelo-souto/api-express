import React from 'react';
import styles from './Login.module.css';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../context/UserContext';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Head from '../../helpers/Head'

function Login() {
	const { userLogin, loading, error } = React.useContext(UserContext);

	const email = useForm('email');
	const senha = useForm('senha');

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (email.validate() && senha.validate()) {
			await userLogin(email.value, senha.value);
		}
	};

	return (
		<div className={`${styles.container} comeFromRight`}>
			<Head title='Login' />
			<h1 className='titulo'>Login</h1>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				<Input
					{...email}
					id='email'
					label='Email:'
				/>
				<Input
					{...senha}
					id='senha'
					label='Senha:'
				/>
				<Button
					loading={loading}
					width='100%'
				>
					Entrar
				</Button>
			</form>
		</div>
	);
}

export default Login;
