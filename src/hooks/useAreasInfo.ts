import { useEffect, useState } from 'react';
import { getAllAreaInfo } from '../api/areaApi';
import type { Area } from '../types';

const POLLING_INTERVAL = 300000; // 30 seconds

export function useAreasInfo() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = () => {
            getAllAreaInfo()
                .then(setAreas)
                .catch(setError)
                .finally(() => {
                    // Only set initial loading to false
                    if (loading) {
                        setLoading(false);
                    }
                });
        };

        fetchData(); // Fetch immediately on mount
        const intervalId = setInterval(fetchData, POLLING_INTERVAL); // Then fetch every 30 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [loading]); // Dependency array to manage initial loading state

    return { areas, loading, error };
}