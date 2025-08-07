import { Marker, Popup } from 'react-leaflet';
import type { Device } from '../../types';
import DeviceIcon from './DeviceIcon';

const DeviceMark: React.FC<{ device: Device }> = ({ device }) => {
    return (
        <Marker
            icon={DeviceIcon({ status: device.status as "ONLINE" | "OFFLINE" })}
            key={device.device_id}
            position={[device.latitude, device.longitude]}
        >
            <Popup>{device.device_name} ({device.status.toLowerCase()})
                <br />
                {device.location_description || '無位置描述'}
            </Popup>
        </Marker>
    );
}

export default DeviceMark;
