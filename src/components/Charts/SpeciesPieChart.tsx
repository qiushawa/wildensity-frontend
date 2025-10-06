import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

interface SpeciesPieChartProps {
  selectedArea: string | null;
  areas: Area[];
  species: Species[];
}

const SpeciesPieChart: React.FC<SpeciesPieChartProps> = ({ selectedArea, areas, species }) => {
  // 過濾啟用物種

  const pieData = selectedArea
    ? areas
        .find(a => a.name === selectedArea)
        ?.density
        .map((d, i) => ({
          name: species[i].name,
          value: d ?? 0,
          color: species[i].color,
          enabled: species[i].enable
        }))
        .filter(item => item.enabled) ?? []
    : [];

  return (
    <div className="h-full w-full  p-4">
      {selectedArea ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}`} />
            {/* <Legend align="center" /> */}
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">請選擇樣區</div>
      )}
      <h2 className="text-center mb-2 text-lg">物種組成</h2>

    </div>
    
  );
};

export default SpeciesPieChart;
