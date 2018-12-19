//https://quentinchap.github.io/f2-2018/#/
//https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9

import db from './db/db.js';
import express from 'express';
//import mid from './db/mid.js';

import mongoose from 'moongoose';
import {MONGO} from './conf/env';

const app = express();

app.get('/api/posts', (req, res) => {
	res.status(200).send({
		posts: db
	})
});

const PORT = 4000;

app.listen(PORT, () => {
	console.log("");
});


/*dossier post: fichiers controller model route services*/
