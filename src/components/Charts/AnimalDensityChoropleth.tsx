import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ButtonList from '../ButtonList';


// ---------- Type 定義 ----------
interface RegionFeature extends GeoJSON.Feature {
  properties: {
    name: string;
    density: Record<string, number | null>; // 改成可用物種名稱索引
  };
}

interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    name: string;
    density: Record<string, number | null>; // 與上面一致
  };
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][];
  };
}

interface Species {
  name: string;
  color: string;
  enable: boolean;
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
    species[0]?.name || ''
  );
  const [selectedArea, setLocalSelectedArea] = useState<string | null>(null);

  // 顏色映射
  const getColor = (d: number | null) => {
    if (d == null) return '#ccc'; // no data
    if (d > 80) return '#800026';
    if (d > 60) return '#BD0026';
    if (d > 40) return '#E31A1C';
    if (d > 20) return '#FC4E2A';
    if (d > 10) return '#FD8D3C';
    if (d > 0) return '#FEB24C';
    return '#FFEDA0';
  };

  // 區塊樣式
  const style = (feature: RegionFeature): L.PathOptions => {
    console.log('Feature properties:', feature.properties); // 調試用
    console.log('Selected species:', selectedSpecies); // 調試用
    const speciesIdx = species.findIndex(s => s.name === selectedSpecies);
    const density = feature.properties.density[speciesIdx] ?? null;
    console.log(`Density for ${feature.properties.name}:`, density); // 調試用
    return {
      fillColor: getColor(density),
      weight: feature.properties.name === selectedArea ? 3 : 1,
      opacity: 1,
      color: 'transparent',
      dashArray: feature.properties.name === selectedArea ? '' : '3',
      fillOpacity: 0.5
    };
  };

  // 點擊事件與 popup
  const onEachFeature = (feature: RegionFeature, layer: L.Layer) => {

    layer.on({
      click: () => {
        setLocalSelectedArea((prev) =>
          prev === feature.properties.name ? null : feature.properties.name
        );
        setSelectedArea((prev) =>
          prev === feature.properties.name ? null : feature.properties.name
        );
      },
    });

  };

  // 啟用物種列表
  const enabledSpecies = species.filter((s) => s.enable).map((s) => s.name);

  return (
    <div className="h-full w-full flex flex-col">

<MapContainer
  center={[23.5, 121]}
  zoom={9}
  minZoom={8}
  inertia={true}
  className="h-[calc(100%-40px)] w-full rounded-lg relative"
>
  {/* ButtonList 放到地圖上，絕對定位 */}
<div className="absolute top-2 right-2 z-[1000] pointer-events-auto">
  <ButtonList options={enabledSpecies} onSelect={setSelectedSpecies} />
</div>

  <TileLayer
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  />

  <GeoJSON
    data={areas as any}
    style={style as any}
    onEachFeature={onEachFeature}
  />
</MapContainer>
    </div>
  );
};

export default AnimalDensityChoroplethWithSpecies;
