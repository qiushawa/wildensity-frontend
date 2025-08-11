import { useEffect, useState } from 'react';
import { getAreaDevices } from '../api/areaApi';
import type { Device } from '../types';

export function useAreaDevices(area_ids: number[]): {
    devices: Device[];
    loading: boolean;
    error: Error | null;
} {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (area_ids.length === 0) {
            setDevices([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        Promise.all(area_ids.map(id => getAreaDevices(id)))
            .then(results => {
                const merged = results.flat();
                setDevices(merged);
                setError(null);
            })
            .catch(error => {
                setError(error);
                setDevices([]);
            })
            .finally(() => setLoading(false));
    }, [JSON.stringify(area_ids)]);

    return { devices, loading, error };
}
