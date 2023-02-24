function Head({ titulo, descricao }) {
	document.title = titulo;
	document.querySelector('meta[name="description"]').setAttribute('content', descricao);

	return <></>;
}

export default Head;
