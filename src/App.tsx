import { Routes, Route } from 'react-router-dom'
import Layout from "./Layout"
import HomePage from './pages/HomePage'
import CameraPage from './pages/CameraPage'
import DeviceLocationEditPage from './pages/DeviceLocationEditPage'
import NoMatch from './pages/NoMatch'
import AreaMapPage from './pages/AreaMapPage'
import './index.css' // Ensure Tailwind CSS is imported

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/map' element={<AreaMapPage />} />
                    <Route path='/camera' element={<CameraPage />} />
                    <Route path="/area/:areaId/device/:deviceId/edit-location" element={<DeviceLocationEditPage />} />
                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    )
}
export default App
