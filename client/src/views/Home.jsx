import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledHome } from './Home.style';
import Loading from './Loading';

const Home = () => {
	const { user } = useUserAuth();
	const [ticker, setTicker] = useState('');
	const [tickerData, setTickerData] = useState([]);

	useEffect(() => {
		if (ticker) {
			fetch('/tickerTimeSeries', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ticker: ticker
				})
			})
				.then(res => res.json())
				.then(data => {
					// todo: do in backend
					data = data.reverse();
					data.forEach(item => (item.date = new Date(item.date)));

					if (data.length) {
						setTickerData(data);
						console.log('there is tickerData', data);
					}
				});
		}
	}, [ticker, setTickerData]);

	return (
		<StyledHome id="home-page" style={{ height: '100vh' }}>
			<div className="sticky-top">
				<Navbar onChange={setTicker} />
			</div>
			{!tickerData.length ? (
				<Loading />
			) : (
				<div style={{ border: '1px solid red' }}>
					{' '}
					+ search result:::
					<div>{ticker && ticker}</div>
					<div>{tickerData && JSON.stringify(tickerData)}</div>
				</div>
			)}
			{/* <div className="p-4 box mt-3 text-center">
				Hello Welcome <br />
				{user && user.displayName ? user.displayName : user.email}
			</div> */}
		</StyledHome>
	);
};

export default Home;
