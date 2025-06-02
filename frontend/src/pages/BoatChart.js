import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import get from '../api.js'
import Section from '../utils/Section';

function StackedBarChart({ data, Xvariable, Yvariables }) {
    const colors = ["LightBlue", "MediumSeaGreen", "SandyBrown", "MediumVioletRed", "Wheat", "Teal", "SpringGreen"];
    return (
        <BarChart width={data.length * 100} height={300} data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Xvariable} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Yvariables.map((y, index) => (<Bar dataKey={y} stackId="a" fill={colors[index % colors.length]} />))}
        </BarChart>
    );
}

export default function BoatChart({ boats }) {
    const baseList = boats.map(b => (b.boat_id));
    const [idListString, setIdListString] = useState(Array.from(baseList).join(','));
    const [activeButtons, setActiveButtons] = useState(new Set(baseList));
    const [boatChart, setBoatChart] = useState(null);

    useEffect(() => {
        get(`boatchart/${idListString}`)
        .then(setBoatChart)
        .catch(console.error);
    }, []);

    return (
        <div>
            <div className="Block">
                <ul className="boats">
                    {boats.map(b => (<li><strong>{b.name}</strong><br />{b.fishing_type}</li>))}
                </ul>
            </div>
            { boatChart?.boat_bills && <StackedBarChart data={boatChart.boat_bills} Xvariable="date" Yvariables={boatChart.boat_names} />}
        </div>
    );
}
