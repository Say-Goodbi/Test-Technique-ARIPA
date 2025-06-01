import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function LineChartExample({ data, Xvariable, Yvariables}) {
    const colors = ["ForestGreen", "FireBrick", "Aquamarine", "Coral", "DarkBlue"];
    return (
        <LineChart
            width={800}
            height={400}
            data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={Xvariable} />
        <YAxis />
        <Tooltip />
        <Legend />
        {Yvariables.map((key, i) => (
            <Line
                key={key}
                type="monotone"
                dataKey={Yvariables[i]}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
            />
        ))}
    </LineChart>
  );
}
