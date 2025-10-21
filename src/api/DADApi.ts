import { API_BASE } from '../constants/global';


export async function getDAD() {
    const res = await fetch(`${API_BASE}/test`);

    const json = await res.json();
    
    return json.data; // 物種列表
}