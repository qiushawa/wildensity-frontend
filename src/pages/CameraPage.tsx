import React from "react";
import CameraCard from "../components/CameraCard";
import { useAreaDevices } from "../hooks/useAreaDevices";
import { useAreas } from "../hooks/useAreas";
import type { Device } from "../types";

function uniqueDevices(devices: Device[]): Device[] {
    const seen = new Set<number>();
    const unique: Device[] = [];
    for (const d of devices) {
        if (!seen.has(d.device_id)) {
            seen.add(d.device_id);
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

    const { devices = [], loading: devicesLoading, error: devicesError } =
        useAreaDevices(areaIds.length > 0 ? areaIds : []);

    const uniqueDevicesList = React.useMemo(() => uniqueDevices(devices), [devices]);

    if (areasLoading || devicesLoading) return <div>Loading...</div>;
    if (areasError || devicesError) return <div>Error loading devices</div>;

    if (areas.length === 0) {
        return <div className="text-center text-gray-500">沒有樣區資料</div>;
    }

    return (
        <div>
            {areas.map((area) => {
                const areaDevices = uniqueDevicesList.filter(d => d.area_id === area.area_id);

                return (
                    <div key={area.area_id} className="mb-8">
                        <h1 className="text-2xl font-bold mb-4">{area.area_name??`未命名樣區-${area.area_id}`}</h1>
                        <hr className="mb-4 w-[20%] h-1 bg-gray-300" />
                        {areaDevices.length === 0 ? (
                            <div className="text-gray-400">此樣區沒有設備</div>
                        ) : (
                            <>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {areaDevices.map((device) => (
                                        <CameraCard
                                            key={`area-${area.area_id}-device-${device.device_id}`}
                                            device={device}
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
