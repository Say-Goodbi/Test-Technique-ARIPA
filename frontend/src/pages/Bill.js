import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import get from '../api.js';
import Return from '../utils/Return'
import Section from '../utils/Section'

function RenderLine(line) {
    return (
        <li className="header">
            <p>{line.name} ~ {line.presentation}</p>
            <p>{line.quantity}  *  {line.unit_price}  =  {line.total_price}</p>
        </li>
    );
}

export default function Bill() {
    const [b, setBill] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        get(`/bill/${id}`)
        .then(setBill)
        .catch(console.error);
    }, []);

    if (!b)
        return null;
    return (
        <div className="Block">
            <Return />
            <h3>{b.status.toUpperCase()}</h3>
            <div className="header">
                <h2>
                    {b.seller_name} => {b.buyer_name}
                </h2>
                <p className="info"> Créée le: {b.created_at.slice(0, 10)}</p>
                <p className="info"> Mise à jour le: {b.updated_at.slice(0, 10)}</p>
            </div>
            <div className="header">
                <p>{b.delivery_address}</p>
                <p>Facturée le {b.billing_date.slice(0, 10)}</p>
                <p>Payée le {b.paid_on.slice(0, 10)}</p>
            </div>
            <br />
            <p>Total: {b.total} €</p>
            <p>Total TTC: {b.total_ttc} €</p>
            <Section title="Détails">
                <ul className="lines">
                    {RenderLine({name:"Produit", presentation:"Présentation", quantity:"Quantité", unit_price:"Prix unitaire", total_price:"Total"})}
                    <br />
                    {b.lines.map(l => (RenderLine(l)))}
                </ul>
            </Section>
        </div>
    );
}
