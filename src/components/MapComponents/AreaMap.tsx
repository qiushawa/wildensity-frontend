import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';
import ZoomHandler from './ZoomHandler';
import DetailedAreaView from './DetailedAreaView';
import { useAreas } from '../../hooks/useAreas';
import { MAP_TILE_URL, MAP_TILE_ATTRIBUTION } from '../../constants/global';
import 'leaflet/dist/leaflet.css';
import type { LatLngTuple } from 'leaflet';

const AreaMap: React.FC<{ focus?: [number, number] | null }> = ({ focus = null }) => {
  // 狀態：地圖縮放級別，預設為 13
  const [zoom, setZoom] = useState(13);
  // 從自定義 hook 獲取區域資料
  const { areas, loading, error } = useAreas();

  // 處理載入中的狀態
  if (loading) {
    return <div>載入中...</div>;
  }

  // 處理錯誤狀態
  if (error) {
    return <div>載入區域時出錯: {error.message}</div>;
  }

  // 地圖中心點：如果有 focus，則使用 focus 座標；否則使用預設中心點
  const center: LatLngTuple = focus && focus.length === 2 ? focus : [23.7, 120.43];


  return (
    // 渲染地圖容器
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={8}
      style={{ height: "100%", width: "100%" }}
// Collapse all interactive flags into one `interactive` boolean and spread it
const AreaMap: React.FC<{ focus?: LatLngTuple | null }> = ({ focus = null }) => {
  const [zoom, setZoom] = useState(13);
  const { areas, loading, error } = useAreas();

  if (loading) return <div>載入中...</div>;
  if (error)   return <div>載入區域時出錯: {error.message}</div>;

  const center: LatLngTuple = focus || [23.7, 120.43];
  const interactive = !focus;

  // prepare a single props object
  const interactiveProps = {
    scrollWheelZoom: interactive,
    dragging:         interactive,
    zoomControl:      interactive,
    doubleClickZoom:  interactive,
    touchZoom:        interactive,
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={8}
      style={{ height: '100%', width: '100%' }}
      {...interactiveProps}
    >
      <TileLayer url={MAP_TILE_URL} attribution={MAP_TILE_ATTRIBUTION} />
      {interactive && <ZoomHandler onZoomChange={setZoom} />}
      <DetailedAreaView areas={areas} zoom={zoom} />
    </MapContainer>
  );
};
      dragging={focus ? false : true}
      zoomControl={focus ? false : true}
      doubleClickZoom={focus ? false : true}
      touchZoom={focus ? false : true}
    >
      <TileLayer url={MAP_TILE_URL} attribution={MAP_TILE_ATTRIBUTION} />
      {!focus && <ZoomHandler onZoomChange={setZoom} />}
      <DetailedAreaView areas={areas} zoom={zoom} />
    </MapContainer>
  );
};

export default AreaMap;