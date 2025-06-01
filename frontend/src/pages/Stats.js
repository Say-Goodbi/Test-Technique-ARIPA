import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PieChart from '../utils/PieChart';
import Section from '../utils/Section';
import get from '../api.js';

export default function Stats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        get('/stats/families')
        .then(setStats)
        .catch(console.error);
    }, [])

    return (
        <div>
            <Section title="Statut des factures">
                <div className="header">
                    <ul className="bulleted">
                        {stats?.bills.map((r, id) => (<li key={id}>{r.name.toUpperCase()} : <b>{r.value}</b></li>))}
                    </ul>
                    {stats?.bills && <PieChart data={stats.bills} Xvariable="name" />}
                </div>
            </Section>
            <Section title="Familles d'entités">
                <div className="header">
                    <b>Répartition</b>
                    <ul className="bulleted">
                        {stats?.counts.map(r => (<li key={r.family_id}>{r.name} : <b>{r.value} entités</b></li>))}
                    </ul>
                    {stats?.counts && <PieChart data={stats.counts} Xvariable="name" />}
                </div>
                <div className="header">
                    <b>Ventes</b>
                    <ul className="bulleted">
                        {stats?.sales.map(r => (<li key={r.family_id}>{r.name} : <b>{r.value} €</b></li>))}
                    </ul>
                    {stats?.sales && <PieChart data={stats.sales} Xvariable="name" />}
                </div>
            </Section>
            <Section title="Productions des entités">
                <br />
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Total ventes TTC</th>
                        <th>Total kg</th>
                    </tr>
                    {stats?.prods.map(r => (
                        <tr key={r.id}>
                            <td><Link to={`/entity/${r.id}`}>{r.name}</Link></td>
                            <td>{r.total_ttc} €</td>
                            <td>{r.total_kg} kg</td>
                        </tr>
                    ))}
                </table>
            </Section>
        </div>
    );
}
