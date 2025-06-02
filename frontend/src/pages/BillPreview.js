import { React } from 'react';
import { Link } from 'react-router-dom';

export default function BillPreview({ b }) {
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
