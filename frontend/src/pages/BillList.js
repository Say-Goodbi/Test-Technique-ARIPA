import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import get from '../api.js';
import BillPreview from './BillPreview';

export default function BillList() {
    const [bills, setBills] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        get('/bill')
        .then(setBills)
        .catch(console.error);
    }, []);

    const filtered = bills.filter(b => b.bill_number.includes(search));

    return (
        <div>
            <h2>Factures enregistrées : {bills.length}</h2>
            <p className="searchbar"> Trouver une facture : </p>
            <input className="searchbar" type="text" placeholder="Bill number..." value={search} onChange={e => setSearch(e.target.value)} />

            <ul>
                {filtered.map(b => (<li key={b.bill_id}> <BillPreview b={b}/> </li>))}
            </ul>
        </div>
    );
}
