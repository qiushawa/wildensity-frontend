import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import type { Species } from "../../types";

interface Area {
  name: string;
  coordinates: [number, number][];
  density: (number | null)[];
}

interface SpeciesBarChartProps {
  selectedArea: string | null;
  areas: Area[];
  species: Species[];
}

// ---------- 自訂 Tooltip ----------
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white p-2 rounded shadow border border-gray-200 text-sm">
        <p className="font-semibold text-gray-800">
          {value} 隻 / 平方公里
        </p>
      </div>
    );
  }
  return null;
};

const SpeciesBarChart: React.FC<SpeciesBarChartProps> = ({
  selectedArea,
  areas,
  species,
}) => {
  // 過濾只啟用的物種
  const barData =
    selectedArea
      ? areas
        .find((a) => a.name === selectedArea)
        ?.density.map((d, i) => ({
          name: species[i].species_name,
          value: d ?? 0,
          color: species[i].color,
          enabled: species[i].enabled,
        }))
        .filter((item) => item.enabled) ?? []
      : [];

  return (
    <div className="h-full w-full p-4">
      {selectedArea ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 10, right: 15, left: 10, bottom: 25 }}
          >
            {/* X 軸：物種名稱 */}
            <XAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 14, fill: "#333" }} // 調整字型大小與顏色
              angle={-30} // 文字傾斜，避免重疊
              textAnchor="end"
            />
            {/* Y 軸：密度 */}
            <YAxis
              type="number"
              label={{ value: "密度", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 14, fill: "#555" } }}
              tick={{ fontSize: 12, fill: "#333" }}
            />
            <CartesianGrid strokeDasharray="3 3" /> {/* 格線 */}
            {/* 自訂 Tooltip */}
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" barSize={40} radius={[5, 5, 0, 0]}>
              {barData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          請選擇樣區
        </div>
      )}
      <h2 className="text-center mb-2 text-lg">物種密度</h2>
    </div>
  );
};

export default SpeciesBarChart;
