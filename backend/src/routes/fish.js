const express = require('express');
const router = express.Router();
const db = require('../db');

function get_fish(fish_id)
{
    return db.query("SELECT * FROM fish WHERE fish_id = $1;", [fish_id]);
}

router.get('/:id', async (req, res) => {
  try {
    const fish = await get_fish(req.params.id);
    res.send(fish.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
