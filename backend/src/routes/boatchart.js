const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:idlist', async (req, res) => {
    try {
        const idList = req.params.idlist.split(',').map(id => parseInt(id, 10));
        const results = await Promise.all(idList.map(id =>
        db.query(
            `SELECT bill.billing_date AS date, boat.name, bill.total_ttc AS value FROM bill INNER JOIN boat ON bill.boat_id = boat.boat_id WHERE boat.boat_id = $1;`, [id]
        )
        ));
        const data = results.flatMap(r => r.rows.map( r => ({...r, date: r.date.toISOString().slice(0, 7)})));

        /* Formatting */
        const boatNames = Array.from(new Set(data.map(b => b.name)));
        const groupedByDate = {};
    
        data.forEach(({ date, name, value }) => {
            if (!groupedByDate[date]) {
                groupedByDate[date] = { date };
                boatNames.forEach(n => {
                    groupedByDate[date][n] = 0.0;
                });
            }
            groupedByDate[date][name] += parseInt(value, 10);
        });
    
        const result = Object.values(groupedByDate).sort((a, b) => a.date.localeCompare(b.date))
        /* End of formatting */
        const {date, ...boats} = result[0];

        res.json({boat_names: Object.keys(boats), boat_bills: result});
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
