import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';
import ZoomHandler from './ZoomHandler';
import DetailedAreaView from './DetailedAreaView';
import { useAreas } from '../../hooks/useAreas';
import { MAP_TILE_URL, MAP_TILE_ATTRIBUTION } from '../../constants/global';
import 'leaflet/dist/leaflet.css';

// 主地圖組件
const AreaMap: React.FC<{ camera_id?: number; disableZoom?: boolean , center?: [number, number] }> = ({ camera_id, disableZoom = false, center }) => {
	// 狀態：地圖縮放級別，預設為12
	const [zoom, setZoom] = useState(12);

	// 從自定義hook獲取區域資料
	const { areas, loading, error } = useAreas();

	// 處理載入中的狀態
	if (loading) {
		return <div>載入中...</div>;
	}

	// 處理錯誤狀態
	if (error) {
		return <div>載入區域時出錯: {error.message}</div>;
	}

	// 根據縮放級別決定地圖中心點
	// const mapCenter: MapCenter = areas[0] && zoom >= ZOOM_THRESHOLD
	// 	? { lat: areas[0].circle.center[0], lng: areas[0].circle.center[1] }
	// 	: { lat: 23.7, lng: 120.43 };

	return (
		// 渲染地圖容器
		<MapContainer
			center={center || [23.7, 120.43]} // 預設中心點
			zoom={zoom}
			minZoom={7}
			style={{ height: '100%', width: '100%' }}
			scrollWheelZoom={!disableZoom}
			doubleClickZoom={!disableZoom}
			zoomControl={!disableZoom}
			dragging={!disableZoom}
		>
			{/* 地圖瓦片圖層 */}
			<TileLayer
				url={MAP_TILE_URL}
				attribution={MAP_TILE_ATTRIBUTION}
			/>

			{/* 縮放處理組件 */}
			<ZoomHandler onZoomChange={setZoom} />

			{/* 詳細區域視圖顯示 */}
			<DetailedAreaView areas={areas} zoom={zoom} camera_id={camera_id} />
		</MapContainer>
	);
};

export default AreaMap;