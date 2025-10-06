import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Area {
  name: string;
  coordinates: [number, number][];
  density: (number | null)[];
}

interface Species {
  name: string;
  color: string;
  enable: boolean;
}

interface SpeciesBarChartProps {
  selectedArea: string | null;
  areas: Area[];
  species: Species[];
}

const SpeciesBarChart: React.FC<SpeciesBarChartProps> = ({ selectedArea, areas, species }) => {
  // 過濾只啟用的物種
  const enabledSpecies = species.filter(s => s.enable);

  const barData = selectedArea
    ? areas
        .find(a => a.name === selectedArea)
        ?.density
        .map((d, i) => ({
          name: species[i].name,
          value: d ?? 0,
          color: species[i].color,
          enabled: species[i].enable
        }))
        .filter(item => item.enabled) // 忽略未啟用的物種
      ?? []
    : [];

  return (
    <div className="h-full w-full  p-4">
      {selectedArea ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
          >
            <XAxis type="number" label={{ value: "密度", position: "insideBottom", offset: -5 }} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="value">
              {barData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">請選擇樣區</div>
      )}
      <h2 className="text-center mb-2 text-lg">物種密度</h2>

    </div>
  );
};

export default SpeciesBarChart;
