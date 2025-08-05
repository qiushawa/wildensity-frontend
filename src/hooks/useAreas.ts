import { useEffect, useState } from 'react';
import { getAllAreas } from '../api/areaApi';
import type { Area } from '../types';

export function useAreas() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllAreas()
            .then(setAreas)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
    return { areas, loading, error };
}