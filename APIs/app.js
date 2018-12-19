import db from './db/db.js';
import express from 'express';
import mid from './db/mid.js';

const app = express();

app.get('/api/posts', (req, res) => {
	res.status(200).send({
		posts: db
	})
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log("");
});
