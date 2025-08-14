import { useState, useEffect } from "react";
import type { FC } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    updateDeviceLocation,
    getDeviceLocation,
    updateDeviceInfo
} from "../api/DeviceApi";
import { getAreaById } from "../api/areaApi";

interface DeviceLocationEditProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    deviceId: number;
    areaId: number;
}

const DeviceLocationEdit: FC<DeviceLocationEditProps> = ({ isModalOpen, setIsModalOpen, deviceId, areaId }) => {
    const [lat, setLat] = useState<number>(25.04);
    const [lng, setLng] = useState<number>(121.54);
    const [deviceName, setDeviceName] = useState<string>("");
    const [locationDescription, setLocationDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchDevice() {
            setLoading(true);
            const data = await getDeviceLocation(deviceId, areaId);
            const areaData = await getAreaById(areaId);
            console.log(data);
            setDeviceName(data.device_name || "未命名設備");
            setLocationDescription(data.location_description || "無位置描述");
            if ((data.latitude === undefined || data.longitude === undefined) && areaData.circle) {
                setLat(areaData.circle.center[0]);
                setLng(areaData.circle.center[1]);
            } else {
                setLat(data.latitude ?? 25.04);
                setLng(data.longitude ?? 121.54);
            }
            setLoading(false);
        }
        fetchDevice();
    }, [deviceId, areaId]);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setLat(e.latlng.lat);
                setLng(e.latlng.lng);
            },
        });
        return null;
    };

    const handleSave = async () => {
        try {
            await updateDeviceLocation(deviceId, areaId, {
                latitude: lat,
                longitude: lng,
                location_description: locationDescription,
            });
            await updateDeviceInfo(deviceId, areaId, deviceName);
            alert("儲存成功！");
            setIsModalOpen(false);
        } catch (error) {
            alert("儲存失敗：" + error);
        }
    };

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;

    return (
        <>
            {isModalOpen && (
                <>
                    {/* 覆蓋 Leaflet 預設 z-index，避免地圖層蓋住 modal */}
                    <style>{`
                        .leaflet-pane {
                            z-index: 0 !important;
                        }
                        .leaflet-top, .leaflet-bottom {
                            z-index: 0 !important;
                        }
                        .leaflet-marker-pane {
                            z-index: 500 !important;
                        }
                    `}</style>

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative z-[1000]">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                編輯設備座標 (設備ID: {deviceId})
                            </h2>

                            <MapContainer
                                center={[lat, lng]}
                                zoom={13}
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    borderRadius: "8px",
                                    zIndex: 0 // 這個確保 MapContainer 本身層級低
                                }}
                                scrollWheelZoom
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <MapClickHandler />
                                <Marker position={[lat, lng]} />
                            </MapContainer>

                            {/* 表單欄位 */}
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={deviceName}
                                    onChange={(e) => setDeviceName(e.target.value)}
                                    placeholder="設備名稱"
                                    className="border rounded p-2"
                                />
                                <input
                                    type="text"
                                    value={locationDescription}
                                    onChange={(e) => setLocationDescription(e.target.value)}
                                    placeholder="位置描述"
                                    className="border rounded p-2"
                                />
                                <input
                                    type="number"
                                    step="0.000001"
                                    value={lat}
                                    onChange={(e) => setLat(parseFloat(e.target.value))}
                                    placeholder="緯度"
                                    className="border rounded p-2"
                                />
                                <input
                                    type="number"
                                    step="0.000001"
                                    value={lng}
                                    onChange={(e) => setLng(parseFloat(e.target.value))}
                                    placeholder="經度"
                                    className="border rounded p-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                                    取消
                                </button>
                                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
                                    儲存
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default DeviceLocationEdit;
