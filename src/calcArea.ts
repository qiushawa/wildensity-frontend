import * as turf from "@turf/turf";

/**
 * 計算 GeoJSON 座標的面積（平方公里）
 * @param coordinates GeoJSON Polygon 或 MultiPolygon 的 coordinates
 * @returns 面積（平方公里）
 */
export function calculateAreaInKm2(coordinates: number[][][] | number[][][][]): number {
  // 判斷是 Polygon 還是 MultiPolygon
  const geojson =
    Array.isArray(coordinates[0][0][0])
      ? turf.multiPolygon(coordinates as number[][][][])
      : turf.polygon(coordinates as number[][][]);

  // Turf 的面積單位是「平方公尺」
  const areaInSquareMeters = turf.area(geojson);

  // 轉換為平方公里
  return areaInSquareMeters / 1_000_000;
}

