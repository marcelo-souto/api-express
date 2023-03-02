import React from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './Dashboard.module.css';
import Button from '../Form/Button';
import { GET_PAGINAS, DELETE_DELETE_PAGINA } from '../../api/api';
import useFetch from '../../hooks/useFetch';
import ModalPagina from '../Dashboard/ModalPagina';
import Loading from '../../helpers/Loading'
import Head from '../../helpers/Head'

function Dashboard() {

	const { user } = React.useContext(UserContext);
	const { request, data, loading } = useFetch();

	const [modal, setModal] = React.useState(false);
	const [reload, setReload] = React.useState(false)
	const [pagina, setPagina] = React.useState(null)

	React.useEffect(() => {

		const getData = async () => {
			const { url, options } = GET_PAGINAS();
			const { json } = await request(url, options);
		};

		getData();
	}, [reload]);

	const handleCreatePage = () => {
		setPagina(null)
		setModal(true);
	};

	const handleEdit = (pagina) => {
		setPagina(pagina)
		setModal(true)
	}

	const handleDelete = async (paginaId) => {
		const { url, options } = DELETE_DELETE_PAGINA(paginaId)
		const response = await fetch(url, options)

		if (response.ok) setReload(!reload)

	}

	if (loading) return <Loading height='80vh' />
	if (user)
		return (
			<div className={styles.container}>
				<Head title='Dashboard' />
				<h1 className={styles.titulo}>Olá, {user.nome}</h1>
				<div className={styles.pages}>
					<Button
						className={styles.button}
						onClick={handleCreatePage}
					>
						Criar Página
					</Button>
					<ul>
						{data && data.length === 0 && (
							<p style={{ textAlign: 'center' }}>Você ainda não tem paginas</p>
						)}
						{data &&
							data.length > 0 &&
							data.map((pagina, index) => {
								return (
									<li
										key={index}
										className={styles.page}
									>
										<p>/{pagina.nome}</p>
										<Button onClick={() => handleEdit(pagina)} >Editar</Button>
										<Button onClick={() => handleDelete(pagina.paginaId)} variant='danger'>Excluir</Button>
									</li>
								);
							})}
					</ul>
				</div>
				{modal && (
					<ModalPagina
						pagina={pagina}
						reload={reload}
						setReload={setReload}
						setModal={setModal}
						modal={modal}
					/>
				)}
			</div>
		);
}

export default Dashboard;
