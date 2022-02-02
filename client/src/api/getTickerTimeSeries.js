export const getTickerTimeSeries = ticker => {
	return fetch('/tickerTimeSeries', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ticker: ticker
		})
	});
};
