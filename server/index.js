const express = require('express');
const cors = require('cors');
const csv = require('csvtojson');
//const middleware = require('./middleware/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

//app.use(middleware.decodeToken);

app.get('/tickerSymbols', async (req, res) => {
	let csvFile = await csv()
		.fromFile('./data/markets/Nasdaq.csv')
		.fromFile('./data/markets/NYSE.csv')
		.fromFile('./data/markets/Euronext.csv')
		.then(function (jsonArrayObj) {
			for (const item of jsonArrayObj) {
				if (item['field3'] || item['field4']) {
					delete item['field3'];
					delete item['field4'];
				}
			}
			return jsonArrayObj;
		});

	return res.send(csvFile);
});

app.get('/api/watchlist', (req, res) => {
	//console.log('from /api/watchlist', req.headers);

	return res.json({
		watchlist: [
			{
				title: 'ticker 1'
			},
			{
				title: 'ticker 2'
			},
			{
				title: 'ticker 3'
			}
		]
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
