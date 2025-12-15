import { Routes, Route } from 'react-router-dom'
import Layout from "./Layout"
import HomePage from './pages/HomePage'
import CameraPage from './pages/CameraPage'
import NoMatch from './pages/NoMatch'
import AreaMapPage from './pages/AreaMapPage'
import EventHistoryPage from './pages/EventHistoryPage'
import './index.css' // Ensure Tailwind CSS is imported


function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/map' element={<AreaMapPage />} />
                    <Route path='/camera' element={<CameraPage />} />
                    <Route path='/events' element={<EventHistoryPage />} />

                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    )
}
export default App
