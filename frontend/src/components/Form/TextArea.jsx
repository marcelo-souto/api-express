import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './TextArea.module.css';
import Error from '../../helpers/Error';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
	toolbar: [
		[{ font: [] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike'],
		[{ color: [] }, { background: [] }],
		[{ script: 'sub' }, { script: 'super' }],
		['blockquote', 'code-block'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ indent: '-1' }, { indent: '+1' }, { align: [] }],
		['link'],
		['clean']
	]
};

function TextArea({
	label,
	error,
	onChange,
	onBlur,
	value,
	setValue,
	...props
}) {
	return (
		<div>
			<Form.Label className={styles.label}>{label}</Form.Label>
			<ReactQuill
				className={styles.textarea}
				theme='snow'
        modules={modules}
				onChange={setValue}
				value={value}
			/>
			{error && <Error>{error}</Error>}
		</div>
	);
}

export default TextArea;
