import { useEffect, useState } from 'react';
import { getAllSpecies } from '../api/specieApi';
import type { Species } from '../types';

const POLLING_INTERVAL = 300000; // 30 seconds

export function useSpecies() {
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = () => {
            getAllSpecies()
                .then(setSpecies)
                .catch(setError)
                .finally(() => {
                    if (loading) {
                        setLoading(false);
                    }
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [loading]);

    return { species, loading, error };
}