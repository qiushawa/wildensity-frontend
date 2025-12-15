import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useSpecies } from '../hooks/useSpecies';
import { useAreas } from '../hooks/useAreas';
import { useAreaCameras } from '../hooks/useAreaCameras';
import { useSearchParams } from 'react-router-dom';

const EventHistoryPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const areaIdParam = searchParams.get('areaId');
    const [selectedAreaId, setSelectedAreaId] = useState<number>(areaIdParam ? parseInt(areaIdParam, 10) : 10000);
    const cameraId = searchParams.get('cameraId') ? parseInt(searchParams.get('cameraId')!, 10) : undefined;

    const { events, pagination, loading, error, page, setPage, pageSize } = useEvents(selectedAreaId, 1, 10, cameraId);
    const { species } = useSpecies();
    const { areas } = useAreas();
    const { cameras } = useAreaCameras([selectedAreaId]);
    const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

    const getSpeciesName = (id: number) => {
        const s = species.find(s => s.species_id === id);
        return s ? s.species_name : id;
    };

    const getCameraInfo = (id: number) => {
        const camera = cameras.find(c => c.camera_id === id);
        if (!camera) return id;
        return (
            <>
                <div style={{ fontSize: '16px' }}>{camera.location_description || ''}</div>
                <div style={{ fontSize: '12px' }}>{camera.camera_name}</div>
            </>
        );
    };

    const toggleExpand = (id: number) => {
        setExpandedEventId(expandedEventId === id ? null : id);
    };

    const handleAreaChange = (id: number) => {
        setSelectedAreaId(id);
        setPage(1); // Reset to first page when area changes
        setSearchParams({ areaId: id.toString() });
    };

    if (loading) return <div className="p-6 text-center">載入中...</div>;
    if (error) return <div className="p-6 text-center text-red-500">錯誤: {error.message}</div>;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">事件歷史紀錄</h2>

            <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
                {areas.map(area => (
                    <button
                        key={area.area_id}
                        onClick={() => handleAreaChange(area.area_id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedAreaId === area.area_id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {area.area_name}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事件編號</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">偵測物種</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">相機資訊</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間戳記</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event) => (
                            <React.Fragment key={event.event_id}>
                                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpand(event.event_id)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.event_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getSpeciesName(event.species_id)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getCameraInfo(event.camera_id)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.start_timestamp).toLocaleString()}</td>
                                </tr>

                                {expandedEventId === event.event_id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan={5} className="px-6 py-4">
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                                <div><strong>樣區</strong> {event.area_id}</div>
                                                <div><strong>偵測數量:</strong> {event.num_individuals}</div>
                                                <div><strong>滯留時間:</strong> {event.duration_s} 秒</div>
                                                <div><strong>移動距離:</strong> {event.movement_distance_m.toFixed(2)} 公尺</div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        顯示 {((page - 1) * pageSize) + 1} 到 {Math.min(page * pageSize, pagination.total)} 筆，共 {pagination.total} 筆
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            上一頁
                        </button>
                        <span className="px-3 py-1">第 {page} 頁 / 共 {pagination.totalPages} 頁</span>
                        <button
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            下一頁
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventHistoryPage;
