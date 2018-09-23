'use strict';
const express = require('express');

const app = express();

app.use(express.static('public'));
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

//redirect all traffic
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(3000, () => console.log('listening to 3000'));
