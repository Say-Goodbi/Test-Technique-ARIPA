import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import get from '../api.js'
import Return from '../utils/Return';
import Section from '../utils/Section';
import LineChart from '../utils/LineChart';

function BillPreview({ b }) {
    return (
        <li>
        <div className="EntityPreview" style={{ border: `4px solid ${b.type == 'buy' ? 'red' : 'green'}`}}>
            <Link to={`/bill/${b.bill_id}`}>
                <h3>{b.bill_number} - {b.status.toUpperCase()}</h3>
                <div className="header">
                    <h2>{b.seller_name} => {b.buyer_name}</h2>
                    <p>Payée le {b.paid_on.slice(0, 10)}</p>
                </div>
                <p>{b.delivery_address}</p>
                <p>Total: {b.total} €</p>
                <p>Total TTC: {b.total_ttc} €</p>
            </Link>
        </div>
        </li>
    );
}

function sells(entity)
{
    return (
        <div>
            Revenus des ventes : {entity?.sales.sum} € <br />
            Acheteurs principaux :
            <ul className="boats">
                {entity?.sales.top_buyers.map(e => (
                    <li>{e.name}
                        <div className="header">
                            <p>{e.sum} € </p>
                            <p>({e.percentage} %)</p>
                        </div>
                    </li>)
                )}
            </ul>
            <br />
        </div>
    );
}

function purchases(entity) {
    return (
        <div>
            Coûts des achats : {entity?.purchases.sum} € <br />
            Fournisseurs principaux :
            <ul className="boats">
                {entity?.purchases.top_sellers.map(e => (
                    <li>{e.name}
                        <div className="header">
                            <p>{e.sum} € </p>
                            <p>({e.percentage} %)</p>
                        </div>
                    </li>)
                )}
            </ul>
            <br />
        </div>
    );
}

export default function Entity() {
    const { id } = useParams();
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        get(`entity/${id}`)
        .then(setEntity)
        .catch(console.error);
    }, []);

    return (
        <div className="Block">
            <Return />
            <div className="header">
                <h2>{entity?.name}</h2>
                <p className="info"> SIRET: {entity?.siret}</p>
            </div>
            <p>{entity?.description}</p>
            {/*<Section title="Produits phares">
                <ul>
                    // Produits phares (nom + % du total des revenus)
                </ul>
            </Section>*/}
            <Section title="Ventes et Achats">
                <LineChart data={entity?.chart} Xvariable="date" Yvariables={["sales_amount", "purchases_amount"]}/>
                <div className="Block">
                    {entity?.sales?.top_buyers.length > 0 && sells(entity)}
                    {entity?.purchases?.top_sellers.length > 0 && purchases(entity)}
                    ~ Total TTC : {Math.round(entity?.sales.sum - entity?.purchases.sum)} €
                </div>
            </Section>
            <Section title="Bateaux">
                <div className="Block">
                    <ul className="boats">
                        {entity?.boats.map(b => (<li><strong>{b.name}</strong><br />{b.fishing_type}</li>))}
                    </ul>
                </div>
                // Graphique barres superposées / séléction bateaux chiffre d'affaire
            </Section>
            <Section title="Factures">
                <ul>
                    {entity?.bills.map(b => (<li key={b.bill_id}> <BillPreview b={b}/> </li>))}
                </ul>
            </Section>
        </div>
    );
}
