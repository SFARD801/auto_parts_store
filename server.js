const express = require('express');
const app = express();
const port = 3000;

//serve static files (HTML,CSS,JS)
app.use(express.static('public'));

//load sample data
const products = require('./data/products.json');

//API route to fetch products
app.get('/api/products', (req, res) => {
    res.json(products);
});

//starting server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});