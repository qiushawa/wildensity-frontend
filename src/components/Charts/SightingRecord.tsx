import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import type { MultiSpeciesData, Species } from "../../types";

interface SightingRecordProps {
  data: MultiSpeciesData[][]; // 多樣區
  species: Species[];
  selectedAreaIndex?: number; // 選中樣區索引
}

const SightingRecord: React.FC<SightingRecordProps> = ({
  data,
  species,
  selectedAreaIndex,
}) => {
  if (
    selectedAreaIndex === undefined ||
    !data[selectedAreaIndex] ||
    data[selectedAreaIndex].length === 0
  ) {
    return (
      <div className="flex items-center justify-center h-full">
        請選擇樣區
      </div>
    );
  }

  const areaData = data[selectedAreaIndex];

  const processedData = areaData.map((d) => {
    const record: Record<string, number | string> = { time: d.time };
    species.forEach((s, idx) => {
      if (s.enabled) record[s.species_name] = d.num_individuals[idx] ?? 0;
    });
    return record;
  });

  const enabledSpecies = species.filter((s) => s.enabled);

  // 計算每個物種尖峰時間
  const peakTimes: Record<string, string[]> = {};
  enabledSpecies.forEach((s) => {
    let maxVal = -Infinity;
    let times: string[] = [];
    processedData.forEach((d) => {
      const val = d[s.species_name] as number;
      if (val > maxVal) {
        maxVal = val;
        times = [d.time as string];
      } else if (val === maxVal) {
        times.push(d.time as string);
      }
    });
    peakTimes[s.species_name] = times;
  });

  return (
    <div className="p-5 h-[100%] w-[100%]">
      <ResponsiveContainer width="100%" height="100%" style={{ marginTop: "20px" }}>
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: "出現次數", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend verticalAlign="top" align="center" />

          {/* 尖峰區域 */}
          {enabledSpecies.map((s) =>
            peakTimes[s.species_name].map((t) => (
              <ReferenceArea
                key={`${s.species_name}-${t}`}
                x1={t}
                x2={t}
                stroke={s.color}
                strokeOpacity={0.2}
                fill={s.color}
                fillOpacity={0.2}
              />
            ))
          )}

          {/* 線圖 */}
          {enabledSpecies.map((s) => (
            <Line
              key={s.species_name}
              type="monotone"
              dataKey={s.species_name}
              name={s.species_name}
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
