declare module 'leaflet.heat' {
  import * as L from 'leaflet';
  export function heatLayer(
    latlngs: L.LatLngExpression[],
    options?: any
  ): L.Layer;
}
