import { useMapEvent } from 'react-leaflet';

interface ZoomHandlerProps {
  onZoomChange: (zoom: number) => void;
}

const ZoomHandler: React.FC<ZoomHandlerProps> = ({ onZoomChange }) => {
  useMapEvent('zoomend', (e) => {
    onZoomChange(e.target.getZoom());
  });

  return null;
};

export default ZoomHandler;
