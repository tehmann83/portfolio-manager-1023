const express = require('express');
const cors = require('cors');
//const middleware = require('./middleware/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

//app.use(middleware.decodeToken);

app.get('/api', (req, res) => {
	return res.json({ message: 'Hello from server!' });
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
