import { useEffect, useState } from 'react';
import { getAreaCameras } from '../api/areaApi';
import type { Camera } from '../types';

export function useAreaCameras(area_ids: number[]): {
    cameras: Camera[];
    loading: boolean;
    error: Error | null;
} {
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (area_ids.length === 0) {
            setCameras([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        Promise.all(area_ids.map(id => getAreaCameras(id)))
            .then(results => {
                const merged = results.flat();
                setCameras(merged);
                setError(null);
            })
            .catch(error => {
                setError(error);
                setCameras([]);
            })
            .finally(() => setLoading(false));
    }, [JSON.stringify(area_ids)]);

    return { cameras, loading, error };
}
