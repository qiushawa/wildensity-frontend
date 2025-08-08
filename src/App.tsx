import { Routes, Route } from 'react-router-dom'
import Layout from "./Layout"
import Home from './pages/Home'
import Camera from './pages/Camera'
import NoMatch from './pages/NoMatch'
import './index.css' // Ensure Tailwind CSS is imported
function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/map' element={<div>樣區地圖</div>} />
                    <Route path='/camera' element={<Camera />} />
                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    )
}
export default App
