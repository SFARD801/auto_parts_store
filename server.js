const express = require('express');
const app = express();
const port = 3000;

//Allowing to serve static files (HTML,CSS,JS)
app.use(express.static('public'));

//Loading sample data
const products = require('./data/products.json');

//API route to fetch products
app.get('/api/products', (req, res) => {
    res.json(products);
});

//Starting the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});