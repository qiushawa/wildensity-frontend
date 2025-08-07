import { Polygon, Popup } from 'react-leaflet';
import type { PolygonLayerProps } from '../../types';

const AreaLayer: React.FC<PolygonLayerProps> = ({ positions, popupContent }) => {
  return (
    <Polygon
      positions={positions}
      pathOptions={{
        color: '#3388ff',
        weight: 3,
        fillColor: '#3388ff',
        fillOpacity: 0.3,
      }}
    >
      <Popup>{popupContent}</Popup>
    </Polygon>
  );
};

export default AreaLayer;