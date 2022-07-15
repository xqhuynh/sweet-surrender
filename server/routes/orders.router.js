const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to fetch all orders to display on admin page 
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/orders GET route');
    // Sql query, join tables and select columns do display
    // productId, name, price
    const queryText = `SELECT product.id, name, price
	                    FROM product 
	                    JOIN orders
	                    ON product.id = orders.productid;`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log('GET /orders/error', err);
        })
})

// DELETE route to delete specific order item
router.delete('/:id', (req, res) => {
    console.log('DELETE order item Req.params is:', req.params);

    const sqlQuery = `DELETE FROM "orders" WHERE productId = $1;`;
    const sqlParams = [req.params.id];

    pool.query(sqlQuery, sqlParams)
        .then((result) => {
            console.log('DELETE order item successful');
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('DELETE order item failed', err);
            res.sendStatus(500);
        })
})

module.exports = router;