import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { Species } from "../../types";
import { calculateAreaInKm2 } from "../../calcArea";

interface Area {
  name: string;
  coordinates: [number, number][];
  density: (number | null)[];
}

interface SpeciesPieChartProps {
  selectedArea: string | null;
  areas: Area[];
  species: Species[];
}

const SpeciesPieChart: React.FC<SpeciesPieChartProps> = ({
  selectedArea,
  areas,
  species,
}) => {
  // 找出選中的樣區
  const selected = selectedArea ? areas.find((a) => a.name === selectedArea) : null;

  // 計算面積（平方公里）
  const areaKm2 = selected ? calculateAreaInKm2([selected.coordinates]) : 0;

  // 計算 pie 資料
  const pieData =
    selected && selected.density
      ? selected.density
          .map((d, i) => ({
            name: species[i].species_name,
            value: (d ?? 0) * areaKm2, // ✅ 密度 × 面積
            color: species[i].color,
            enabled: species[i].enabled,
          }))
          .filter((item) => item.enabled)
      : [];

  return (
    <div className="h-full w-full p-4">
      {selectedArea ? (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) =>
                  `${name} ${(value ?? 0).toFixed(0)}隻`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
             
            </PieChart>
          </ResponsiveContainer>

          {/* 樣區資訊 */}
          <div className="text-center text-gray-700">
            <h2 className="text-lg font-semibold">估計數量</h2>
            <p className="text-sm">
              面積：約 {areaKm2.toFixed(3)} 平方公里
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          請選擇樣區
        </div>
      )}
    </div>
  );
};

export default SpeciesPieChart;
