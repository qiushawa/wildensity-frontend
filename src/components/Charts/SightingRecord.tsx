import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface Species {
  name: string;
  enable: boolean;
  color: string;
}
interface MultiSpeciesData {
  time: string;
  num_individuals: number[];
}

interface SightingRecordProps {
  data: MultiSpeciesData[][];  // 多樣區
  species: Species[];
  selectedAreaIndex?: number;  // 選中樣區索引
}

const SightingRecord: React.FC<SightingRecordProps> = ({ data, species, selectedAreaIndex }) => {
  if (selectedAreaIndex === undefined || !data[selectedAreaIndex] || data[selectedAreaIndex].length === 0) {
    return <div className="flex items-center justify-center h-full">請選擇樣區</div>;
  }

  const areaData = data[selectedAreaIndex];

  const processedData = areaData.map(d => {
    const record: Record<string, number | null | string> = { time: d.time };
    species.forEach((s, idx) => {
      if (s.enable) record[s.name] = d.num_individuals[idx] ?? 0;
    });
    return record;
  });

  const enabledSpecies = species.filter(s => s.enable);

  return (
    <div className="p-5 h-[100%] w-[100%]">
      <ResponsiveContainer width="100%" height="100%" style={{ marginTop: '20px' }}>
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: "出現次數", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend verticalAlign="top" align="center" />
          {enabledSpecies.map(s => (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              name={s.name}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <h1 className="my-2 text-xl text-center">活動時段分布圖</h1>

    </div>
  );
};
export default SightingRecord;
