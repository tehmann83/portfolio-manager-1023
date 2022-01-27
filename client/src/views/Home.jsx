import axios from 'axios';
import React, { useEffect } from 'react';

const Home = ({ token }) => {
	useEffect(() => {
		if (token) {
			fetchData(token);
		}
	}, [token]);

	const fetchData = async token => {
		const config = {
			headers: {
				Authorization: 'Bearer ' + token
			}
		};
		const res = await axios.get('/api/watchlist', config);

		console.log('res from fetchData/Home.jsx:', res);
	};

	return <div>home</div>;
};

export default Home;
