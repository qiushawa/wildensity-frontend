import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import type { Species } from "../../types";

interface Area {
  name: string;
  density: (number | null)[];
}


interface Props {
  areas: Area[];
  species: Species[];
}

const GlobalSpeciesBarChart: React.FC<Props> = ({ areas, species }) => {
  const enabledSpecies = species.filter(s => s.enabled);

  // 將密度資料正確對應到啟用物種
  const chartData = areas.map(area => {
    const obj: any = { area: area.name };
    enabledSpecies.forEach(sp => {
      const originalIndex = species.findIndex(s => s.species_name === sp.species_name);
      obj[sp.species_name] = area.density[originalIndex] ?? 0;
    });
    return obj;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="area" />
        <YAxis label={{ value: "密度", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend verticalAlign="top" align="center" />
        {enabledSpecies.map(sp => (
          <Bar
            key={sp.species_name}
            dataKey={sp.species_name}
            fill={sp.color}
            barSize={30}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GlobalSpeciesBarChart;
