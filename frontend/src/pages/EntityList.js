import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import get from '../api.js';
import PieChart from '../utils/PieChart';
import Section from '../utils/Section';

function EntityPreview({ e }) {
    return (
        <div className="EntityPreview">
            <Link to={`/entity/${e.entity_id}`}>
                <div className="header">
                    <h2>{e.name}</h2>
                    <p className="info"> SIRET: {e.siret}</p>
                </div>
                <p>{e.description}</p>
            </Link>
        </div>
    );
}

export default function EntityList() {
    const [entities, setEntities] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        get('/entity')
        .then(setEntities)
        .catch(console.error);
    }, []);

    const filtered = entities?.list.filter(e => e.name.includes(search));

    return (
        <div>
            <h2>Entités enregistrées : {entities?.list.length}</h2>
            <Section title="Revenus de ventes par famille">
                {entities?.chart && <PieChart data={entities.chart} Xvariable="name" />}
            </Section>
            <Section title="Top ventes">
                <div className="Block">
                    <ul className="header">
                        {entities?.top_sales.map(e => (<li key={e.entity_id}><Link to={`/entity/${e.member_id}`}>{e.name}<br />{(e.sum / entities.total_ttc * 100).toFixed(2)} %</Link></li>))}
                    </ul>
                </div>
            </Section>
            <Section title="Top achats">
                <div className="Block">
                    <ul className="header">
                        {entities?.top_purchases.map(e => (<li key={e.entity_id}><Link to={`/entity/${e.buyer_id}`}>{e.name}<br />{(e.sum / entities.total_ttc * 100).toFixed(2)} %</Link></li>))}
                    </ul>
                </div>
            </Section>
            <h3> Trouver une entité : </h3>
            <input className="searchbar" type="text" placeholder="Entity name..." value={search} onChange={e => setSearch(e.target.value)} />

            <ul>
                {filtered?.map(e => (<li key={e.entity_id}> <EntityPreview e={e}/> </li>))}
            </ul>
        </div>
    );
}
