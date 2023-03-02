import React from 'react';
import styles from './Loading.module.css';

function Loading({ height }) {
	return (
		<div style={{ minHeight: height ? `${height}` : '100%' }} className={styles.loadingContainer}>
			<div className={styles.loading}></div>
		</div>
	);
}

export default Loading;
