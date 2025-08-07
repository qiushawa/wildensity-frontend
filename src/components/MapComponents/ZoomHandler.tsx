import { useMapEvent } from 'react-leaflet';
import type { ZoomHandlerProps } from '../../types';


const ZoomHandler: React.FC<ZoomHandlerProps> = ({ onZoomChange }) => {
	useMapEvent('zoomend', (e) => {
		onZoomChange(e.target.getZoom());
	});

	return null;
};

export default ZoomHandler;
