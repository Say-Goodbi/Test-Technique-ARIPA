const express = require('express');
const router = express.Router();
const db = require('../db');

async function get_bill_lines(bill_id) {
    const bill = await db.query("SELECT buyer.name AS buyer_name, seller.name AS seller_name, bill.* FROM bill INNER JOIN entity AS seller ON bill.member_id = seller.entity_id INNER JOIN entity AS buyer ON bill.buyer_id = buyer.entity_id WHERE bill_id = $1;", [bill_id]);
    const lines = await db.query("SELECT bill_line.* FROM bill_line INNER JOIN bill ON bill.bill_id = bill_line.bill_id WHERE bill_line.bill_id = $1 ORDER BY name;", [bill_id]);

    if (!bill)
        return null;
    return { ...bill.rows[0], lines: lines.rows};
}

async function get_bills() {
    return db.query("SELECT bill.*, buyer.name AS buyer_name, seller.name AS seller_name FROM bill JOIN entity AS buyer ON bill.buyer_id = buyer.entity_id JOIN entity AS seller ON bill.member_id = seller.entity_id ORDER BY bill.paid_on;");
}

router.get('/:id', async (req, res) => {
    try {
        const result = await get_bill_lines(req.params.id);
        res.send(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await get_bills();
        res.send(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
