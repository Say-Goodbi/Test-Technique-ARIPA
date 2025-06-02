import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PieChart from '../utils/PieChart';
import Section from '../utils/Section';
import BillPreview from './BillPreview';
import get from '../api.js';

export default function Stats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        get('/stats/families')
        .then(setStats)
        .catch(console.error);
    }, [])

    return (
        <div style={{textAlign: 'center'}}>
            <Section title="Suivi des factures">
                <div className="header">
                    <h3>Statut des factures</h3>
                    <ul className="bulleted">
                        {stats?.bills.map((r, id) => (<li key={id}>{r.name.toUpperCase()} : <b>{r.value}</b></li>))}
                    </ul>
                    {stats?.bills && <PieChart data={stats.bills} Xvariable="name" />}
                </div>
                <h2>Factures suspectes</h2>
                <ul>
                    {stats?.suspect && stats.suspect.map(b => (<li key={b.bill_id}> <BillPreview b={b}/> </li>))}
                </ul>
            </Section>
            <Section title="Types d'activité">
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
            <Section title="Production par type de pêche">
                <br />
                {stats?.fishing_types && 
                <div className="header">
                    <PieChart title="Total ventes en € (TTC)" width={900} data={stats.fishing_types.map(r => ({...r, name: r.fishing_type, value: r.total_ttc}))} Xvariable="name" />
                    <PieChart title="Nombre de bateaux" width={900} data={stats.fishing_types.map(r => ({...r, name: r.fishing_type, value: r.count}))} Xvariable="name" />
                </div>
                }
                <br />
                <table>
                    <thead>
                        <th>Type de pêche</th>
                        <th>Nombre de bateaux</th>
                        <th>Puissance moyenne (cv)</th>
                        <th>Total des ventes (TTC)</th>
                        <th>Poids total (kg)</th>
                    </thead>
                    {stats?.fishing_types.map((r, id) => (
                        <tr key={id}>
                            <td>{r.fishing_type}</td>
                            <td>{r.count}</td>
                            <td>{r.power}</td>
                            <td>{r.total_ttc} €</td>
                            <td>{r.total_kg} kg</td>
                        </tr>
                    ))}
                </table>
            </Section>
            <Section title="Productions des entités">
                <br />
                <table>
                    <thead>
                        <th>Nom</th>
                        <th>Total des ventes (TTC)</th>
                        <th>Poids total (kg)</th>
                    </thead>
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
