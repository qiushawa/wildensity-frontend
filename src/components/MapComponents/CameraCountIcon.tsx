import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';


const CameraCountMark = ({ count }: { count: number }): L.DivIcon => {
    const icon = new L.DivIcon({
        html: ReactDOMServer.renderToString(
            <div style={{
                width: '25px',
                height: '25px',
                display: 'flex',
                color: 'black',
                fontSize: '24px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {count}
            </div>
        ),
        className: 'dummy',
    });
    return icon;
}

export default CameraCountMark;