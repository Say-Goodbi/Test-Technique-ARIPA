const express = require('express');
const router = express.Router();
const db = require('../db');

async function add_lines(bills) {
    const billsWithLines = await Promise.all(
        bills.map(async (r) => {
            const lines = await db.query("SELECT * FROM bill_line WHERE bill_id = $1", [r.bill_id]);
            return {...r, lines: lines.rows};
        })
    );
    return billsWithLines;
}

async function get_sells(member_id)
{
    const bills = await db.query('SELECT bill.*, buyer.name AS buyer_name, seller.name AS seller_name FROM bill INNER JOIN entity AS seller ON seller.entity_id = bill.member_id INNER JOIN entity AS buyer ON buyer.entity_id = bill.buyer_id WHERE member_id = $1;', [member_id]);

    return bills.rows;
//    return add_lines(bills.rows);
}

async function get_buys(buyer_id)
{
    const bills = await db.query('SELECT bill.*, buyer.name AS buyer_name, seller.name AS seller_name FROM bill INNER JOIN entity AS seller ON seller.entity_id = bill.member_id INNER JOIN entity AS buyer ON buyer.entity_id = bill.buyer_id WHERE buyer_id = $1;', [buyer_id]);

    return bills.rows;
//    return add_lines(bills.rows);
}

function merge_buys_and_sells(buys, sells)
{
    const tagged_sells = sells.map(row => ({ ...row, type: 'sell' }));
    const tagged_buys  = buys.map(row => ({ ...row, type: 'buy' }));

    const combined = [...tagged_sells, ...tagged_buys];

    combined.sort((a, b) => new Date(b.paid_on) - new Date(a.paid_on));
    return combined;
}

function add_percentage(sum, rows) {
    return rows.map(row => ({...row, percentage: Math.round(row.sum / sum * 100)}));
}

function get_chart_data(sales, purchases) {
    const dataMap = new Map();

    const ensureDate = (date) => {
        if (!dataMap.has(date)) {
            dataMap.set(date, { date, sales_amount: 0, purchases_amount: 0 });
        }
    };

    sales.forEach(row => {
        const date = row.paid_on.toISOString().slice(0, 7);
        ensureDate(date);
        dataMap.get(date).sales_amount += parseFloat(row.total_ttc);
    });
    purchases.forEach(row => {
        const date = row.paid_on.toISOString().slice(0, 7);
        ensureDate(date);
        dataMap.get(date).purchases_amount += parseFloat(row.total_ttc);
    });

    return Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}

router.get('/:id', async (req, res) => {
  try {
    const sells = await get_sells(req.params.id);
    const buys = await get_buys(req.params.id);
    const combined = merge_buys_and_sells(buys, sells);
    const boats = await db.query("SELECT boat.boat_id, boat.name, boat.fishing_type FROM boat INNER JOIN entity ON boat.owner_id = entity.entity_id WHERE entity.entity_id = $1;", [req.params.id]);
    const entity = await db.query("SELECT entity.*, family.description FROM entity INNER JOIN family ON entity.family_id = family.family_id WHERE entity.entity_id = $1;", [req.params.id]);
    const top_buyers = await db.query("SELECT buyer.name, SUM(total_ttc) AS sum FROM bill INNER JOIN entity AS buyer ON buyer.entity_id = bill.buyer_id WHERE member_id = $1 GROUP BY buyer_id, buyer.name ORDER BY sum DESC LIMIT 3;", [req.params.id]);
    const top_sellers = await db.query("SELECT seller.name, SUM(total_ttc) AS sum FROM bill INNER JOIN entity AS seller ON seller.entity_id = bill.member_id WHERE buyer_id = $1 GROUP BY member_id, seller.name ORDER BY sum DESC LIMIT 3;", [req.params.id]);
    const tot_sales = await db.query("SELECT SUM(total_ttc) FROM bill WHERE member_id = $1;", [req.params.id]);
    const tot_purchases = await db.query("SELECT SUM(total_ttc) FROM bill WHERE buyer_id = $1;", [req.params.id]);

    const chart = get_chart_data(sells, buys);

    const sum_sales = tot_sales.rows[0].sum;
    const sum_purchases = tot_purchases.rows[0].sum;

    res.send({...entity.rows[0], sales: {sum: sum_sales, top_buyers: add_percentage(sum_sales, top_buyers.rows)}, purchases: {sum: sum_purchases, top_sellers: add_percentage(sum_purchases, top_sellers.rows)}, boats: boats.rows, bills: combined, chart: chart});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
    try {
        const entities = await db.query("SELECT entity_id, name, description, siret FROM entity INNER JOIN family ON entity.family_id = family.family_id")
        const top_sales = await db.query("SELECT member_id, SUM(total_ttc) AS sum, name FROM bill INNER JOIN entity ON entity.entity_id = member_id GROUP BY member_id, name ORDER BY sum DESC LIMIT 5");
        const top_purchases = await db.query("SELECT buyer_id, SUM(total_ttc) AS sum, name FROM bill INNER JOIN entity ON entity.entity_id = buyer_id GROUP BY buyer_id, name ORDER BY sum DESC LIMIT 5");
        const total = await db.query("SELECT SUM(total_ttc) AS ttc FROM bill;");

        res.send({total_ttc: parseInt(total.rows[0].ttc, 10), top_sales: top_sales.rows, top_purchases: top_purchases.rows, list: entities.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
