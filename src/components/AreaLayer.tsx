import { Polygon, Popup } from 'react-leaflet';

type LatLngTuple = [number, number];

interface PolygonLayerProps {
  positions: LatLngTuple[];
  popupContent?: string;
}

const PolygonLayer: React.FC<PolygonLayerProps> = ({ positions, popupContent }) => {
  return (
    <Polygon
      positions={positions}
      pathOptions={{
        color: 'green',
        weight: 3,
        fillColor: 'green',
        fillOpacity: 0.3,
      }}
    >
      <Popup>{popupContent}</Popup>
    </Polygon>
  );
};

export default PolygonLayer;