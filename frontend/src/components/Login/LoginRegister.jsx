import React from 'react';
import { Form } from 'react-bootstrap';
import Input from '../Form/Input';
import useForm from '../../hooks/useForm';
import Button from '../Form/Button';
import useFetch from '../../hooks/useFetch';
import styles from './Login.module.css';
import { POST_CREATE_USER } from '../../api/api';
import Error from '../../helpers/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../../helpers/Head'

function LoginRegister() {
	const navigate = useNavigate();

	const { loading, request, error, data } = useFetch();

	const email = useForm('email');
	const nome = useForm();
	const senha = useForm('senha');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (nome.validate() && email.validate() && senha.validate()) {
			const { url, options } = POST_CREATE_USER({
				nome: nome.value,
				email: email.value,
				senha: senha.value
			});

			const { response, json } = await request(url, options);
			if (response.ok) navigate('/login');
		}
	};

	return (
		<div className={`${styles.container} comeFromRight`}>
			<Head title='Cadastre-se' />
			<h1 className='titulo'>Cadastre-se</h1>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<Input
					label='Nome:'
					id='nome'
					type='text'
					{...nome}
				/>
				<Input
					label='Email:'
					id='email'
					placeholder='seuemail@email.com'
					{...email}
				/>
				<Input
					label='senha:'
					id='senha'
					type='password'
					{...senha}
				/>
				{error && <Error>{error}</Error>}
				<Button
					loading={loading}
					width='100%'
				>
					Enviar
				</Button>
			</form>
		</div>
	);
}

export default LoginRegister;
