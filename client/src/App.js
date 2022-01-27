import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './views/Home';
import Login from './views/Login';

function App() {
	return (
		<Container>
			<UserAuthContextProvider>
				<Routes>
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</UserAuthContextProvider>
		</Container>
	);
}

export default App;
