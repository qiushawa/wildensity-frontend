export type LatLng = [number, number];

export interface Area {
    area_id: number;
    area_name: string;
    boundary: {
        type: string;
        coordinates: number[][][];
    };
    circle: {
        center: LatLng;
        radius: number;
    };
    cameras?: Camera[];
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
