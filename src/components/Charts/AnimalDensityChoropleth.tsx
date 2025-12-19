import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ButtonList from '../ButtonList';
import { MAP_TILE_ATTRIBUTION, MAP_TILE_URL } from '../../constants/global';
import type { GeoJSONFeature, Species } from '../../types';

// ---------- Type 定義 ----------
interface RegionFeature extends GeoJSON.Feature {
  properties: {
    name: string;
    density: Record<string, number | null>;
  };
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][];
  };
}





interface Props {
  areas: Array<GeoJSONFeature>;
  species: Array<Species>;
  setSelectedArea: React.Dispatch<React.SetStateAction<string | null>>;
}

// ---------- 主組件 ----------
const AnimalDensityChoroplethWithSpecies: React.FC<Props> = ({
  areas,
  species,
  setSelectedArea,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<string>(
    species[0]?.species_name || ''
  );
  const [selectedArea, setLocalSelectedArea] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  // ---------- 顏色映射 ----------
  const getColor = (d: number | null) => {
    if (d == null) return '#ccc'; // 無資料
    if (d > 100) return '#800026';
    if (d > 80) return '#BD0026';
    if (d > 50) return '#E31A1C';
    if (d > 30) return '#FC4E2A';
    if (d > 10) return '#FD8D3C';
    if (d > 5) return '#FEB24C';
    if (d >= 0) return '#FFEDA0';
    return '#ccc';
  };

  // ---------- 計算多邊形中心 ----------
  const getPolygonCenter = (coordinates: [number, number][][]): [number, number] => {
    const points = coordinates[0];
    const latSum = points.reduce((sum, p) => sum + p[1], 0);
    const lngSum = points.reduce((sum, p) => sum + p[0], 0);
    return [latSum / points.length, lngSum / points.length];
  };

  // ---------- 區塊樣式 ----------
  const style = (feature: RegionFeature): L.PathOptions => {
    const speciesIdx = species.findIndex((s) => s.species_name === selectedSpecies);
    const density = feature.properties.density[speciesIdx] ?? null;
    return {
      fillColor: getColor(density),
      weight: feature.properties.name === selectedArea ? 3 : 1,
      opacity: 1,
      color: 'transparent',
      dashArray: feature.properties.name === selectedArea ? '' : '3',
      fillOpacity: 0.5,
    };
  };

  // ---------- 點擊事件 ----------
  const onEachFeature = (feature: RegionFeature, layer: L.Layer) => {
    layer.on({
      click: () => {
        console.log('Clicked feature:', feature);
        const center = getPolygonCenter(feature.geometry.coordinates);
        setLocalSelectedArea((prev) =>
          prev === feature.properties.name ? null : feature.properties.name
        );
        setSelectedArea((prev) =>
          prev === feature.properties.name ? null : feature.properties.name
        );
        setSelectedPosition((prev) =>
          prev && prev[0] === center[0] && prev[1] === center[1] ? null : center
        );
        console.log('Selected position:', selectedPosition);
      },
    });
  };

  // ---------- 圖釘圖示 ----------
  const pinIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  // 啟用物種
  const enabledSpecies = species.filter((s) => s.enabled).map((s) => s.species_name);
  console.log('Enabled Species:', enabledSpecies);
  // ---------- 顏色圖例資料 ----------
  const legendItems = [
    { range: '> 20', color: '#800026' },
    { range: '10 - 20', color: '#BD0026' },
    { range: '5 - 10', color: '#E31A1C' },
    { range: '2 - 5', color: '#FC4E2A' },
    { range: '1 - 2', color: '#FD8D3C' },
    { range: '0.3 - 1', color: '#FEB24C' },
    { range: '0 - 0.3', color: '#FFEDA0' },
    { range: '無資料', color: '#ccc' },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      <MapContainer
        center={[23.5, 121]}
        zoom={9}
        minZoom={8}
        inertia={true}
        className="h-[calc(100%-40px)] w-full rounded-lg relative"
      >
        {/* 右上角：物種選單 */}
        <div className="absolute top-2 right-2 z-[1000] pointer-events-auto">
          <ButtonList
  options={enabledSpecies}
  selected={selectedSpecies}
  onSelect={setSelectedSpecies}
/>
        </div>

        {/* 右下角：顏色圖例 */}
        <div className="absolute bottom-3 right-3 z-[1000] bg-white/90 backdrop-blur-md p-3 rounded-lg shadow text-sm border border-gray-200">
          <div className="font-semibold mb-1 text-center">密度</div>
          {legendItems.map((item) => (
            <div key={item.range} className="flex items-center space-x-2">
              <div
                className="w-5 h-5 rounded-sm border border-gray-300"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.range}</span>
            </div>
          ))}
          <span className="text-xs text-gray-500">單位：individuals/km²</span>
        </div>

        <TileLayer url={MAP_TILE_URL} attribution={MAP_TILE_ATTRIBUTION} />

        <GeoJSON
          data={areas as any}
          style={style as any}
          onEachFeature={onEachFeature}
        />

        {/* 顯示選取圖釘 */}
        {selectedPosition && (
          <Marker position={selectedPosition} icon={pinIcon}></Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default AnimalDensityChoroplethWithSpecies;
