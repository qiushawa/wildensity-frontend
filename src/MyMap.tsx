import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap, useMapEvents, Circle } from 'react-leaflet';
import { TbDeviceCctv } from "react-icons/tb";
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { BiSolidCctv } from "react-icons/bi";

// Define Area and Device types (unchanged)
type Area = {
  area_id: number;
  area_name: string;
  boundary: {
    type: 'Polygon';
    coordinates: number[][][];
  };
};

type Device = {
  device_id: number;
  area_id: number;
  device_name: string;
  location_description: string | null;
  longitude: number | null;
  latitude: number | null;
  status: string;
};

// Custom device marker icon using react-icons
const deviceIcon = L.divIcon({
  html: renderToString(
    <BiSolidCctv style={{ color: '#ff0000ff', fontSize: '30px' }} />
  ),
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 20], // Adjust anchor to align the icon (bottom center for FaMapMarkerAlt)
  popupAnchor: [0, -20], // Adjust popup position
});

// ZoomHandler and BoundsAdjuster components (unchanged)
function ZoomHandler({ setZoomLevel }: { setZoomLevel: (zoom: number) => void }) {
  const map = useMap();
  useMapEvents({
    zoomend: () => {
      setZoomLevel(map.getZoom());
    },
  });
  return null;
}

function BoundsAdjuster({
  coords,
  devices,
  areaCentroid,
  zoomLevel,
}: {
  coords: [number, number][];
  devices: Device[];
  areaCentroid: [number, number];
  zoomLevel: number;
}) {
  const map = useMap();

  useEffect(() => {
    const validCoords = zoomLevel >= 14
      ? [
          ...coords,
          ...devices
            .filter((device) => device.latitude != null && device.longitude != null)
            .map((device) => [device.latitude!, device.longitude!] as [number, number]),
        ]
      : [areaCentroid];

    if (validCoords.length > 0) {
      const bounds = L.latLngBounds(validCoords);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
    }
  }, []);

  return null;
}

// Main MyMap component (unchanged except for deviceIcon usage)
export default function MyMap({ areaId }: { areaId: number }) {
  const [area, setArea] = useState<Area | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [zoomLevel, setZoomLevel] = useState(15);

  useEffect(() => {
    fetch(`http://localhost:3000/api/area?areaId=${areaId}`)
      .then((res) => res.json())
      .then((data: Area) => {
        setArea(data);
      })
      .catch(console.error);
  }, [areaId]);

  useEffect(() => {
    fetch('http://localhost:3000/api/devices')
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 200) {
          setDevices(response.data);
        }
      })
      .catch(console.error);
  }, []);

  if (!area) return <div>載入中...</div>;

  const coords = area.boundary.coordinates[0].map(
    ([lng, lat]) => [lat, lng]
  ) as [number, number][];

  const areaCentroid: [number, number] = coords.reduce(
    (acc, [lat, lng]) => [acc[0] + lat / coords.length, acc[1] + lng / coords.length],
    [0, 0]
  );

  return (
    <MapContainer
      style={{ height: '800px', width: '100%' }}
      zoom={zoomLevel}
      minZoom={7}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {zoomLevel >= 13 && (
        <Polygon positions={coords} color="#ff5559" weight={2} fillOpacity={0.1}>
          <Popup>{area.area_name}</Popup>
        </Polygon>
      )}
      {zoomLevel >= 13 ? (
        devices
          .filter((device) => device.latitude != null && device.longitude != null)
          .map((device) => (
            <Marker
              key={device.device_id}
              position={[device.latitude!, device.longitude!]}
              icon={deviceIcon}
            >
              <Popup>
                <div>
                  <strong>{device.device_name}</strong>
                  <br />
                  {device.location_description || 'No description available'}
                </div>
              </Popup>
            </Marker>
          ))
      ) : (
        <Circle
          center={areaCentroid}
          radius={100 * 1250 / Math.pow(2, zoomLevel / 2)}
          pathOptions={{
            color: '#0000',
            fillColor: '#ff5559',
            fillOpacity: 0.5,
            weight: 2,
          }}
        >
          <Popup>{area.area_name} (Hotspot)</Popup>
        </Circle>
      )}
      <BoundsAdjuster
        coords={coords}
        devices={devices}
        areaCentroid={areaCentroid}
        zoomLevel={zoomLevel}
      />
      <ZoomHandler setZoomLevel={setZoomLevel} />
    </MapContainer>
  );
}