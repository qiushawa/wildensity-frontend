export type LatLng = [number, number];

export interface Area {
  name: string;
  coordinates: [number, number][];
  density: (number | null)[];
}
export interface AreaB {
  area_name: string;
  area_id: number;
  coordinates: [number, number][];
  density: (number | null)[];
}

export interface Camera {
    camera_id: number;
    camera_name: string;
    area_id: number;
    latitude: number;
    longitude: number;
    sd_card_capacity: number;
    sd_card_used_space: number;
    location_description?: string;
    status: string;
}

export interface MapCenter {
    lat: number;
    lng: number;
}

export interface PolygonLayerProps {
    positions: LatLng[];
    popupContent?: string;
}

export interface ZoomHandlerProps {
    onZoomChange: (zoom: number) => void;
}

export interface CameraCardProps {
    Area_id: number;
    SD_Card: number;
    status: "ONLINE" | "OFFLINE" | "LOCATION_UNKNOWN";
    name: string;
    location: {
        description: string;
        latitude: number;
        longitude: number;
    };
}

export interface CameraLocationUpdate {
    latitude: number;
    longitude: number;
    location_description: string;
}

export interface GeoJSONFeature {
  type: "Feature";
  properties: {
    name: string;
    density: (number | null)[];
  };
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
}

export interface MultiSpeciesData {
  time: string;
  num_individuals: (number | null)[];
}

export interface Species {
    species_id: number;
    species_name: string;
    color?: string;
    enabled: boolean;
}
