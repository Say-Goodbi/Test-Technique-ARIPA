const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/families', async (req, res) => {
    try {
        const counts = await db.query("SELECT entity.family_id, family.description AS name, COUNT(*) AS value FROM entity INNER JOIN family ON entity.family_id = family.family_id GROUP BY entity.family_id, family.description ORDER BY entity.family_id ASC;");
        const sales = await db.query("SELECT family.family_id, description AS name, SUM(total_ttc) AS value FROM bill INNER JOIN entity ON entity.entity_id = bill.member_id INNER JOIN family ON family.family_id = entity.family_id GROUP BY family.family_id ORDER BY family.family_id ASC;");
        const entities_prod = await db.query("SELECT member_id AS id, name, SUM(total_ttc) AS total_ttc, SUM(total_kg) AS total_kg FROM bill INNER JOIN entity ON entity_id = member_id GROUP BY member_id, name ORDER BY total_ttc DESC LIMIT 500;");
        const bills = await db.query("SELECT status AS name, COUNT(*) AS value FROM bill GROUP BY name;");

        res.send({counts: counts.rows , sales: sales.rows, prods: entities_prod.rows, bills: bills.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
