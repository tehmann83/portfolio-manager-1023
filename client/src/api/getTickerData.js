export const getTickerData = ticker => {
	return fetch('/tickerData', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ticker: ticker
		})
	});
};
