import { Marker , Popup} from "react-leaflet";
import CameraCountIcon from "./CameraCountIcon";
const CameraCountMark: React.FC<{ count: number; position: [number, number] }> = ({ count, position }) => {
    return (
        <Marker
            icon={CameraCountIcon({ count })}
            position={position}
        >
            <Popup>
                {count}
            </Popup>
        </Marker>
    );
};

export default CameraCountMark;
