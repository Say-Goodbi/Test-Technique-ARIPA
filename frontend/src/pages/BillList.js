import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import get from '../api.js';

function BillPreview({ b }) {
    return (
        <div className="EntityPreview">
            <Link to={`bill/${b.bill_id}`}>
                <div className="header">
                    <h3>{b.bill_number} - {b.status.toUpperCase()}</h3>
                    <p className="info"> Créée le: {b.created_at.slice(0, 10)}</p>
                    <p className="info"> Mise à jour le: {b.updated_at.slice(0, 10)}</p>
                </div>
                <div className="header">
                    <h2>{b.seller_name} => {b.buyer_name}</h2>
                    <p className="info"> TTC: {b.total_ttc} €</p>
                </div>
            </Link>
        </div>
    );
}

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
