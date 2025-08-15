import React from "react";
import CameraCard from "../components/CameraCard";
import { useAreaCameras } from "../hooks/useAreaCameras";
import { useAreas } from "../hooks/useAreas";
import type { Camera } from "../types";

function uniqueCameras(cameras: Camera[]): Camera[] {
    const seen = new Set<string>();
    const unique: Camera[] = [];
    for (const d of cameras) {
        if (!seen.has(`${d.camera_id}-${d.area_id}`)) {
            seen.add(`${d.camera_id}-${d.area_id}`);
            unique.push(d);
        }   
    }
    return unique;
}

const Camera: React.FC = () => {
    const { areas = [], loading: areasLoading, error: areasError } = useAreas();

    const areaIds = React.useMemo(() => {
        return Array.isArray(areas) ? areas.map(area => area.area_id) : [];
    }, [areas]);

    const { cameras = [], loading: camerasLoading, error: camerasError } =
        useAreaCameras(areaIds.length > 0 ? areaIds : []);

    const uniqueCamerasList = React.useMemo(() => uniqueCameras(cameras), [cameras]);

    if (areasLoading || camerasLoading) return <div>Loading...</div>;
    if (areasError || camerasError) return <div>Error loading cameras</div>;

    if (areas.length === 0) {
        return <div className="text-center text-gray-500">沒有樣區資料</div>;
    }
    return (
        <div>
            {areas.map((area) => {
                const areaCameras = uniqueCamerasList.filter(d => d.area_id === area.area_id);

                return (
                    <div key={area.area_id} className="mb-8">
                        <h1 className="text-2xl font-bold mb-4">{area.area_name ?? `未命名樣區-${area.area_id}`}</h1>
                        <hr className="mb-4 w-[20%] h-1 bg-gray-300" />
                        {areaCameras.length === 0 ? (
                            <div className="text-gray-400">此樣區沒有相機</div>
                        ) : (
                            <>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {areaCameras.map((camera) => (
                                        <CameraCard
                                            key={`area-${area.area_id}-camera-${camera.camera_id}`}
                                            camera={camera}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Camera;
