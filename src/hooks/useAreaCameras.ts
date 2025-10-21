import { useEffect, useState } from 'react';
import { getAreaCameras } from '../api/areaApi';
import type { Camera } from '../types';

const POLLING_INTERVAL = 15000; // 30 seconds

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

        const fetchData = () => {
            // No need to set loading to true for background refreshes
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
                .finally(() => setLoading(false)); // loading is true only on first fetch
        };
        
        setLoading(true);
        fetchData(); // Fetch immediately
        
        const intervalId = setInterval(fetchData, POLLING_INTERVAL); // Then poll

        // This cleanup function will run when area_ids changes, restarting the interval
        return () => clearInterval(intervalId);

    }, [JSON.stringify(area_ids)]); // Dependency on the area IDs

    return { cameras, loading, error };
}