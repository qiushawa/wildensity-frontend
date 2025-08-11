import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // 用於路由和參數
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DeviceLocationEdit: React.FC = () => {
    const { deviceId } = useParams<{ deviceId: string }>();
    const navigate = useNavigate();

    // 這邊預設值，你可改成從 API 載入設備原本座標
    const [lat, setLat] = useState(25.04);
    const [lng, setLng] = useState(121.54);
    const [loading, setLoading] = useState(true);

    // 模擬載入設備座標
    useEffect(() => {
        async function fetchDevice() {
            setLoading(true);
            // TODO: 這邊改成你 API 載入設備座標
            // 模擬等待
            await new Promise(r => setTimeout(r, 500));
            // 模擬資料
            setLat(25.03);
            setLng(121.55);
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
        // TODO: 呼叫 API 儲存座標
        alert(`儲存設備 ${deviceId} 新座標：${lat}, ${lng}`);
        // 儲存後回上一頁或導向其他頁面
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
            <h2>編輯設備座標 (設備ID: {deviceId})</h2>
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                style={{ height: 400, width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                <Marker position={[lat, lng]} />
            </MapContainer>

            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
                <label>
                    緯度:
                    <input
                        type="number"
                        step="0.000001"
                        value={lat}
                        onChange={handleLatChange}
                        style={{ width: 150 }}
                    />
                </label>
                <label>
                    經度:
                    <input
                        type="number"
                        step="0.000001"
                        value={lng}
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
