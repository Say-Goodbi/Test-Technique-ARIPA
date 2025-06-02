import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function MyPieChart({ data, Xvariable="name", width=1200, height=500, title=null}) {
    const colors = ["LightSeaGreen", "DarkSlateBlue", "CadetBlue", "Aquamarine", "LightCoral", "Olive"];

    return (<div>
        {title && <h3>{title}</h3>}
        <PieChart width={width} height={height}>
        <Pie
            data={data.map(r => ({...r, value: parseInt(r.value, 10)}))}
            cx="50%" cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            dataKey="value"
        >
            {data.map((entry, index) => (
                <Cell key={`entry.${Xvariable}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart>
    </div>);
}
