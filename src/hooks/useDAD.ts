import { useEffect, useState } from 'react';
import { getDAD } from '../api/DADApi';
import type { MultiSpeciesData } from '../types';

const POLLING_INTERVAL = 300000; // 30 seconds

export function useDAD() {
    const [DAD, setDAD] = useState<MultiSpeciesData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = () => {
            getDAD()
                .then(setDAD)
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

    return { DAD, loading, error };
}