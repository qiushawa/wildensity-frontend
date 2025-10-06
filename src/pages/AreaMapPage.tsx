import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SightingRecord from "../components/Charts/SightingRecord";
import AnimalDensityChoroplethWithSpecies from "../components/Charts/AnimalDensityChoropleth";
import SpeciesBarChart from "../components/Charts/SpeciesBarChart";
import SpeciesPieChart from "../components/Charts/SpeciesPieChart";
import GlobalSpeciesBarChart from "../components/Charts/GlobalSpeciesBarChart";

interface GeoJSONFeature {
  type: "Feature";
  properties: {
    name: string;
    density: (number | null)[];
  };
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
}

interface Area {
  name: string;
  coordinates: [number, number][];
  density: (number | null)[];
}

interface Species {
  name: string;
  enable: boolean;
  color: string;
}

function convertAreasToGeoJSON(areas: Area[]): GeoJSONFeature[] {
  return areas.map(area => ({
    type: "Feature",
    properties: {
      name: area.name,
      density: area.density
    },
    geometry: {
      type: "Polygon",
      coordinates: [area.coordinates]
    }
  }));
}

const AreaMapPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

// 範例物種
const species: Species[] = [
  { name: "山羌", color: "#367ebd", enable: true },
  { name: "台灣獼猴", color: "#ff6384", enable: true },
  { name: "野豬", color: "#4bc0c0", enable: false },
  { name: "石虎", color: "#d3d3d3", enable: true }
];

// 範例樣區 (簡化網格，每兩公里一個節點)
const areas: Area[] = [
  {
    name: "Area 1",
    coordinates: [
          [121.0, 24.3],      // 左下
          [121.07, 24.3],    // 右下 (+16 km ≈ 0.144 度經度)
          [121.07, 24.4],  // 右上 (+16 km ≈ 0.144 度緯度)
          [120.97, 24.4],    // 左上
          [120.97, 24.3]       // 閉合第一個點
    ],
    density: [90, 70, null, 50] // 範例數值
  },
  {
    name: "Area 2",
    coordinates: [
          [121.1, 24.3],      // 左下
          [121.204, 24.3],    // 右下 (+16 km ≈ 0.144 度經度)
          [121.204, 24.404],  // 右上 (+16 km ≈ 0.144 度緯度)
          [121.1, 24.404],    // 左上
          [121.1, 24.3]       // 閉合第一個點
    ],
    density: [10, 30, null, 50] // 範例數值
  }
];

// 多樣區時間資料（對應 areas 的順序）
const sampleData = [
  [ // 雪霸國家公園
    { time: "00:00", num_individuals: [5, 3, null, 2] },
    { time: "01:00", num_individuals: [4, 2, null, 1] },
    { time: "02:00", num_individuals: [3, 4, null, 1] },
    { time: "03:00", num_individuals: [2, 1, null, 0] },
    { time: "04:00", num_individuals: [3, 2, null, 1] },
    { time: "05:00", num_individuals: [4, 3, null, 2] },
    { time: "06:00", num_individuals: [5, 5, null, 3] },
    { time: "07:00", num_individuals: [6, 4, null, 2] },
    { time: "08:00", num_individuals: [7, 5, null, 3] },
    { time: "09:00", num_individuals: [6, 6, null, 2] },
    { time: "10:00", num_individuals: [5, 4, null, 2] },
    { time: "11:00", num_individuals: [6, 5, null, 3] },
    { time: "12:00", num_individuals: [7, 6, null, 2] },
    { time: "13:00", num_individuals: [6, 5, null, 1] },
    { time: "14:00", num_individuals: [5, 4, null, 2] },
    { time: "15:00", num_individuals: [4, 3, null, 1] },
    { time: "16:00", num_individuals: [3, 2, null, 1] },
    { time: "17:00", num_individuals: [4, 3, null, 2] },
    { time: "18:00", num_individuals: [5, 4, null, 2] },
    { time: "19:00", num_individuals: [6, 5, null, 3] },
    { time: "20:00", num_individuals: [5, 4, null, 2] },
    { time: "21:00", num_individuals: [4, 3, null, 1] },
    { time: "22:00", num_individuals: [3, 2, null, 1] },
    { time: "23:00", num_individuals: [2, 1, null, 1] }
  ],
  [ // 玉山國家公園
    { time: "00:00", num_individuals: [2, 1, null, 1] },
    { time: "01:00", num_individuals: [1, 0, null, 0] },
    { time: "02:00", num_individuals: [2, 1, null, 1] },
    { time: "03:00", num_individuals: [1, 0, null, 0] },
    { time: "04:00", num_individuals: [1, 1, null, 1] },
    { time: "05:00", num_individuals: [2, 0, null, 1] },
    { time: "06:00", num_individuals: [3, 1, null, 1] },
    { time: "07:00", num_individuals: [2, 2, null, 1] },
    { time: "08:00", num_individuals: [1, 1, null, 0] },
    { time: "09:00", num_individuals: [2, 0, null, 1] },
    { time: "10:00", num_individuals: [1, 1, null, 0] },
    { time: "11:00", num_individuals: [2, 1, null, 1] },
    { time: "12:00", num_individuals: [1, 2, null, 1] },
    { time: "13:00", num_individuals: [1, 1, null, 0] },
    { time: "14:00", num_individuals: [0, 1, null, 0] },
    { time: "15:00", num_individuals: [1, 0, null, 1] },
    { time: "16:00", num_individuals: [2, 1, null, 1] },
    { time: "17:00", num_individuals: [1, 1, null, 0] },
    { time: "18:00", num_individuals: [2, 0, null, 1] },
    { time: "19:00", num_individuals: [1, 1, null, 0] },
    { time: "20:00", num_individuals: [0, 1, null, 0] },
    { time: "21:00", num_individuals: [1, 0, null, 1] },
    { time: "22:00", num_individuals: [2, 1, null, 1] },
    { time: "23:00", num_individuals: [1, 1, null, 0] }
  ]
];


  const selectedAreaIndex = selectedArea
    ? areas.findIndex(a => a.name === selectedArea)
    : undefined;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 地圖 */}
        <div className="lg:w-1/3 w-full h-[800px]">
          <AnimalDensityChoroplethWithSpecies
            areas={convertAreasToGeoJSON(areas)}
            species={species}
            setSelectedArea={setSelectedArea}
          />
        </div>

        {/* 右側圖表 */}
        <div className="lg:w-2/3 w-full flex flex-col gap-6">

          {/* 過渡動畫 */}
          <AnimatePresence mode="wait">
            
                      {/* 活動時段分布圖 (依選區) */}
                    
          {selectedAreaIndex !== undefined && (
            <>
            <h1 className="text-4xl text-center mt-12">{selectedArea || "全部樣區"}</h1>
            <div className="h-[325px]">
              <SightingRecord
                data={sampleData}
                species={species}
                selectedAreaIndex={selectedAreaIndex}
              />
            </div>
            </>
          )}
            {selectedArea ? (
              <motion.div
                key="area-charts"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <div className="sm:w-1/2 h-[325px]">
                  <SpeciesBarChart
                    selectedArea={selectedArea}
                    areas={areas}
                    species={species}
                  />
                </div>
                <div className="sm:w-1/2 h-[325px]">
                  <SpeciesPieChart
                    selectedArea={selectedArea}
                    areas={areas}
                    species={species}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="global-chart"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <div className="sm:w-full h-[325px]">
                  <GlobalSpeciesBarChart areas={areas} species={species} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      </div>
    </div>
  );
};

export default AreaMapPage;
