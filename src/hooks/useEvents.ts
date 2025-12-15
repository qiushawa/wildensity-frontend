import { useEffect, useState, useCallback } from 'react';
import { getEvents } from '../api/eventApi';
import type { Event, Pagination } from '../types';

const POLLING_INTERVAL = 10000; // 10 seconds

export function useEvents(areaId: number, initialPage: number = 1, initialPageSize: number = 10, cameraId?: number) {

    const [events, setEvents] = useState<Event[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const fetchData = useCallback(() => {
        setLoading(true);
        getEvents(areaId, page, pageSize, cameraId)
            .then(data => {
                setEvents(data.events);
                setPagination(data.pagination);
                setError(null);
            })
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    }, [areaId, page, pageSize, cameraId]);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            // Background refresh without setting loading state
            getEvents(areaId, page, pageSize, cameraId)
                .then(data => {
                    setEvents(data.events);
                    setPagination(data.pagination);
                    setError(null);
                })
                .catch(console.error); // Log error but don't disrupt UI
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [fetchData, areaId, page, pageSize, cameraId]);


    return {
        events,
        pagination,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        refresh: fetchData
    };
}
