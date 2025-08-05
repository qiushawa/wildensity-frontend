import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useState } from 'react';
import ZoomHandler from './ZoomHandler';
import AreaLayer from './AreaLayer';
import { useAreas } from '../hooks/useAreas';
import { MAP_TILE_URL, MAP_TILE_ATTRIBUTION } from '../constants/global';
import 'leaflet/dist/leaflet.css';

const ZOOM_THRESHOLD = 13;

const AreaMap: React.FC = () => {
	const [zoom, setZoom] = useState(13);
	const { areas, loading, error } = useAreas();
	if (loading) return <div>載入中</div>;
	if (error) return <div>載入區域時出錯: {error.message}</div>;
	const focusedArea = zoom >= ZOOM_THRESHOLD ? areas[0] : null;
	console.log('Zoom level:', zoom);

	return (
		<MapContainer
			center={focusedArea ? focusedArea.circle.center : [23.7, 120.43]}
			zoom={zoom}
			minZoom={8}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				url={MAP_TILE_URL}
				attribution={MAP_TILE_ATTRIBUTION}
			/>
			<ZoomHandler onZoomChange={setZoom} />

			{zoom < ZOOM_THRESHOLD &&
				areas.map(area => (
					<CircleMarker
						key={area.area_id}
						center={area.circle.center}
						radius={area.circle.radius / 75}
						pathOptions={{ fillOpacity: 0.3, color: 'transparent', fillColor: 'red' }}
					>
						<Popup >{area.area_name}</Popup>
					</CircleMarker>
				))}

			{zoom >= ZOOM_THRESHOLD && (
				areas.map(area => {
					return (<>
						<AreaLayer popupContent={area.area_name} key={area.area_id} positions={area.boundary.coordinates[0].map(([lng, lat]) => [lat, lng])} />
						{area.devices
							?.filter(device => device.status !== 'LOCATION_UNKNOWN')
							.map(device => (
								<CircleMarker
									key={device.device_id}
									center={[device.latitude, device.longitude]}
									radius={5}
									pathOptions={{ fillOpacity: 0.8, color: 'blue', fillColor: 'blue' }}
								>
									<Popup>{device.device_name} ({device.status})</Popup>
								</CircleMarker>
							))}


					</>);
				})
			)}
		</MapContainer>
	);
};

export default AreaMap;