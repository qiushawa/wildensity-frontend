import { Marker, Popup } from 'react-leaflet';
import type { Camera } from '../../types';

const CameraMark: React.FC<{ camera: Camera }> = ({ camera }) => {
    return (
        <Marker
            key={camera.camera_id}
            position={[camera.latitude, camera.longitude]}
        >
            <Popup>{camera.camera_name} ({camera.status.toLowerCase()})
                <br />
                {camera.location_description || '無位置描述'}
            </Popup>
        </Marker>
    );
}

export default CameraMark;
