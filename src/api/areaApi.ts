import { API_BASE } from '../constants/global';

// 獲取所有區域
export async function getAllAreas() {
    const res = await fetch(`${API_BASE}/areas`);
    if (!res.ok) throw new Error('取得區域列表失敗');

    const json = await res.json();

    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');

    return json.data; // 區域列表
}

export async function getAreaById(areaId: number) {
    const res = await fetch(`${API_BASE}/areas/${areaId}`);
    if (!res.ok) throw new Error('取得區域資訊失敗');

    const json = await res.json();

    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');

    return json.data; // 區域資訊
};

// 獲取區域設備列表
export async function getAreaDevices(areaId: number) {
    const res = await fetch(`${API_BASE}/areas/${areaId}/devices`);
    if (!res.ok) throw new Error('取得區域設備列表失敗');

    const json = await res.json();

    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');

    return json.data; // 區域設備列表
}