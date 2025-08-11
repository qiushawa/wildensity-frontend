import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // 用於路由和參數
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { updateDeviceLocation, getDeviceLocation, updateDeviceInfo } from "../api/DeviceApi";
import { getAreaById } from "../api/areaApi";

const DeviceLocationEdit: React.FC = () => {
    const { deviceId, areaId } = useParams<{ deviceId: string, areaId: string }>();
    const navigate = useNavigate();

    // 這邊預設值，你可改成從 API 載入設備原本座標
    const [lat, setLat] = useState(25.04);
    const [deviceName, setDeviceName] = useState("");
    const [locationDescription, setLocationDescription] = useState("");
    const [lng, setLng] = useState(121.54);
    const [loading, setLoading] = useState(true);

    // 模擬載入設備座標
    useEffect(() => {
        async function fetchDevice() {
            setLoading(true);
            // TODO: 這邊改成你 API 載入設備座標
            const data = await getDeviceLocation(parseInt(deviceId!), parseInt(areaId!));
            const areaData = await getAreaById(parseInt(areaId!));
            setDeviceName(data.device_name || "未命名設備");
            setLocationDescription(data.location_description || "無位置描述");
            if ((data.latitude === undefined || data.longitude === undefined) && areaData.circle) {
                setLat(areaData.circle.center[0]);
                setLng(areaData.circle.center[1]);
            }
            else {
                setLat(data.latitude);
                setLng(data.longitude);
            }
            setLoading(false);
        }
        fetchDevice();
    }, [deviceId]);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setLat(e.latlng.lat);
                setLng(e.latlng.lng);
            },
        });
        return null;
    };

    const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) setLat(val);
    };

    const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) setLng(val);
    };

    const handleSave = async () => {
        try {
            await updateDeviceLocation(parseInt(deviceId!), parseInt(areaId!), {
                latitude: lat,
                longitude: lng,
                location_description: locationDescription,
            });
            await updateDeviceInfo(parseInt(deviceId!), parseInt(areaId!), deviceName);
            alert("儲存成功！");
            navigate(-1);
        } catch (error) {
            alert("儲存失敗：" + error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
            <h2>編輯設備座標 (設備ID: {deviceId})</h2>
            <MapContainer
                center={[lat ?? 25.04, lng ?? 121.54]}
                zoom={13}
                style={{ height: 400, width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                <Marker position={[lat ?? 25.04, lng ?? 121.54]} />
            </MapContainer>

            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
                <label>
                    設備名稱:
                    <input
                        type="text"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        style={{ width: 150 }}
                    />  
                </label>
                <label>
                    位置描述:
                    <input
                        type="text"
                        value={locationDescription}
                        onChange={(e) => setLocationDescription(e.target.value)}
                        style={{ width: 150 }}
                    />
                </label>    
                <label>
                    緯度:
                    <input
                        type="number"
                        step="0.000001"
                        value={lat ?? ""}
                        onChange={handleLatChange}
                        style={{ width: 150 }}
                    />
                </label>
                <label>
                    經度:
                    <input
                        type="number"
                        step="0.000001"
                        value={lat ?? ""}
                        onChange={handleLngChange}
                        style={{ width: 150 }}
                    />
                </label>

            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button onClick={handleCancel}>取消</button>
                <button onClick={handleSave}>儲存</button>
            </div>
        </div>
    );
};

export default DeviceLocationEdit;
