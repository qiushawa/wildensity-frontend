import { API_BASE } from '../constants/global';
import type { Device, DeviceLocationUpdate } from '../types';

export async function updateDeviceLocation(deviceId: number, areaId: number, location: DeviceLocationUpdate) {
    const res = await fetch(`${API_BASE}/areas/${areaId}/devices/${deviceId}/coordinates`, {
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

export async function getDeviceLocation(deviceId: number, areaId: number) {
    const res = await fetch(`${API_BASE}/areas/${areaId}/devices/${deviceId}/coordinates`);
    if (!res.ok) throw new Error('獲取設備位置失敗');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');
    return json.data; // 設備位置資料
}

// 更新設備資訊
export async function updateDeviceInfo(deviceId: number, areaId: number, deviceName: string) {
    console.log(`Updating device info for deviceId: ${deviceId}, areaId: ${areaId}, device_name: ${deviceName}`);
    const res = await fetch(`${API_BASE}/areas/${areaId}/devices/${deviceId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deviceName,
        }),
    });
    if (!res.ok) throw new Error('更新設備資訊失敗');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');
    return json.data; // 更新後的設備資料
}