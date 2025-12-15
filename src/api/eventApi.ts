import { API_BASE } from '../constants/global';
import type { EventsResponse } from '../types';

export async function getEvents(areaId: number, page: number = 1, pageSize: number = 8, cameraId?: number): Promise<EventsResponse> {
    const url = new URL(`${API_BASE}/areas/${areaId}/events`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('pageSize', pageSize.toString());
    if (cameraId) {
        url.searchParams.append('cameraId', cameraId.toString());
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('取得事件列表失敗');

    const json = await res.json();

    if (json.code !== 200) throw new Error(json.message || 'API 回傳錯誤');

    return json.data;
}
