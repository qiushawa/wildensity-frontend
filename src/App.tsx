import { Routes, Route } from 'react-router-dom'
// import Layout from "./Layout"
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import './index.css' // Ensure Tailwind CSS is imported
function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/wildensity/' >
                    <Route index element={<Home />} />
                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    )
}
export default App
