const express = require('express');
const cors = require('cors');
require('dotenv').config();
const entityRoutes = require('./routes/entity');
const billRoutes = require('./routes/bill');
const fishRoutes = require('./routes/fish');
const boatRoutes = require('./routes/boat');
const statsRoutes = require('./routes/stats');
const boatchartRoutes = require('./routes/boatchart');

const app = express();

app.use(cors({
    origin: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`}));
app.use(express.json());

app.use('/entity', entityRoutes);
app.use('/bill', billRoutes);
app.use('/fish', fishRoutes);
app.use('/boat', boatRoutes);
app.use('/stats', statsRoutes);
app.use('/boatchart', boatchartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
