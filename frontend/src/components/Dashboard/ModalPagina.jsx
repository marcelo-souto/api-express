import React from 'react';
import Modal from '../Modal';
import Input from '../Form/Input';
import useForm from '../../hooks/useForm';
import TextArea from '../Form/TextArea';
import Button from '../Form/Button';
import styles from './ModalPagina.module.css';
import useFetch from '../../hooks/useFetch'
import { POST_CREATE_PAGINA, PUT_UPDATE_PAGINA } from '../../api/api'
import Error from '../../helpers/Error'
import Success from '../../helpers/Success'

function ModalPagina({ setModal, modal, reload, setReload, pagina }) {

	const update = pagina ? true : false
	const { data, request, loading, error } = useFetch()

	const nome = useForm();
	const conteudo = useForm()

	React.useEffect(() => {
		if (pagina) {
			nome.setValue(pagina.nome ? pagina.nome : '')
			conteudo.setValue(pagina.conteudo ? pagina.conteudo : '')
		}
	}, [pagina])

	const handleCancel = () => {
		setModal(false);
	};

	const handleSubmit = async () => {

		let post = {
			nome: nome.value,
			conteudo: conteudo.value
		}

		if (conteudo.validate() && nome.validate()) {

			if (update) {

				post = Object.entries(post)
					.filter((item) => pagina[item[0]] !== item[1])
					.reduce((prev, curr) => {
						return { ...prev, [curr[0]]: curr[1] };
					}, {});


				const { url, options } = PUT_UPDATE_PAGINA({ ...post, paginaId: pagina.paginaId })
				await request(url, options)

			} else {

				const { url, options } = POST_CREATE_PAGINA(post)
				await request(url, options)

			}

		}
	}

	React.useEffect(() => {

		let interval;

		if (data) {

			interval = setInterval(() => {
				setModal(false)
				setReload(!reload)
			}, 2000)

		}

		return () => clearInterval(interval)
	}, [data])

	return (
		<Modal>
			<h2 className='titulo-3'>Nova Página</h2>
			<Input
				id='nome'
				label='Nome:'
				{...nome}
			/>
			<TextArea {...conteudo} />
			<div className={styles.botoes}>
				{data && !error && <Success>{data.mensagem}</Success>}
				{error && <Error>{error}</Error>}
				<div>
					{!data && <Button loading={loading} onClick={handleSubmit}>Enviar</Button>}
					{!data && <Button
						loading={loading}
						onClick={handleCancel}
						variant='secondary'
					>
						Cancelar
					</Button>}
				</div>
			</div>

		</Modal>
	);
}

export default ModalPagina;
