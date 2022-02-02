const express = require('express');
const cors = require('cors');
const csv = require('csvtojson');
const yahooFinance = require('yahoo-finance');
const bodyParser = require('body-parser');
//const middleware = require('./middleware/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

app.post('/tickerTimeSeries', async (req, res) => {
	console.log('from server: ', req.body);
	const ticker = req.body.ticker;
	const today = new Date();
	const todayString = new Date(
		today.getTime() - today.getTimezoneOffset() * 60000
	)
		.toISOString()
		.split('T')[0];

	const timeSeries = await yahooFinance.historical({
		symbol: ticker,
		from: new Date(Date.now() - 3600 * 1000 * 24 * 1000),
		to: todayString
	});

	if (timeSeries) {
		res.status(200).json(timeSeries);
	} else {
		res.send('foooo'); //todo: error handling
	}
});

app.post('/tickerData', async (req, res) => {
	const ticker = req.body.ticker;
	const yahooData = await yahooFinance.quote(ticker, [
		'calendarEvents',
		'defaultKeyStatistics',
		'earnings',
		'financialData',
		'price',
		'recommendationTrend',
		'summaryDetail',
		'summaryProfile',
		'upgradeDowngradeHistory'
	]);

	if (yahooData) {
		res.status(200).json(yahooData);
	} //todo: error handling
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
