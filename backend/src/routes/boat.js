const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:id', async (req, res) => {
  try {
    const incomes = await db.query("SELECT SUM(bill.total), bill.paid_on FROM boat INNER JOIN bill ON boat.boat_id = bill.boat_id WHERE boat.boat_id = $1 GROUP BY bill.paid_on ORDER BY bill.paid_on;", [req.params.id]);
    const infos = await db.query("SELECT entity.name, matricule, entity.name, fishing_type FROM boat INNER JOIN entity ON boat.owner_id = entity.entity_id WHERE boat_id = $1;" , [req.params.id]);
    res.send({...infos.rows[0], incomes: incomes.rows});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
