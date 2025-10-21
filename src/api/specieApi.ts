import { API_BASE } from '../constants/global';


export async function getAllSpecies() {
    const res = await fetch(`${API_BASE}/species`);
    if (!res.ok) throw new Error('取得物種列表失敗');

    const json = await res.json();

    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');

    return json.data; // 物種列表
}