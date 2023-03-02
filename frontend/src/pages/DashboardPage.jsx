import React from 'react';
import { UserContext } from '../context/UserContext';
import Dashboard from '../components/Dashboard/Dashboard';

function DashboardPage() {
	const { user } = React.useContext(UserContext);

	return (
		<section>
			<Dashboard />
		</section>
	);
}

export default DashboardPage;
