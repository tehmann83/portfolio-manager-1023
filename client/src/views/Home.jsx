import React from 'react';
import Navbar from '../components/Navbar';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledHome } from './Home.style';

const Home = () => {
	const { user } = useUserAuth();

	return (
		<StyledHome id="home-page">
			<Navbar />
			{/* <div className="p-4 box mt-3 text-center">
				Hello Welcome <br />
				{user && user.displayName ? user.displayName : user.email}
			</div> */}
		</StyledHome>
	);
};

export default Home;
