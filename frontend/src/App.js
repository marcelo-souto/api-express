import Sessao from './pages/Sessao';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Sessao />
			</div>
		</BrowserRouter>
	);
}

export default App;
