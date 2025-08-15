import { API_BASE } from '../constants/global';
import type { CameraLocationUpdate } from '../types';

export async function updateCameraLocation(cameraId: number, areaId: number, location: CameraLocationUpdate) {
    const res = await fetch(`${API_BASE}/areas/${areaId}/cameras/${cameraId}/coordinates`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
    });
    if (!res.ok) throw new Error('更新設備位置失敗');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');
    return json.data; // 更新後的設備資料
}

export async function getCameraLocation(cameraId: number, areaId: number) {
    const res = await fetch(`${API_BASE}/areas/${areaId}/cameras/${cameraId}/coordinates`);
    if (!res.ok) throw new Error('獲取設備位置失敗');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');
    return json.data; // 設備位置資料
}

// 更新設備資訊
export async function updateCameraInfo(cameraId: number, areaId: number, cameraName: string) {
    console.log(`Updating camera info for cameraId: ${cameraId}, areaId: ${areaId}, camera_name: ${cameraName}`);
    const res = await fetch(`${API_BASE}/areas/${areaId}/cameras/${cameraId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cameraName,
        }),
    });
    if (!res.ok) throw new Error('更新設備資訊失敗');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');
    return json.data; // 更新後的設備資料
}