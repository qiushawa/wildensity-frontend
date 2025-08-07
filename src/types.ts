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
	devices?: Device[];
}

export interface Device {
	device_id: number;
	device_name: string;
	area_id: number;
	latitude: number;
	longitude: number;
	location_description?: string;
	status: string;
}

export interface MapCenter {
	lat: number;
	lng: number;
}

export interface PolygonLayerProps {
	positions: [number, number][];
	popupContent?: string;
}

export interface ZoomHandlerProps {
	onZoomChange: (zoom: number) => void;
}
