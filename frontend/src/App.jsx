import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Capture from './components/capture/Capture'
import Homepage from './components/home/HomePage'
import SignUp from './components/signUp/signUp'

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path='/adduser' element={<SignUp />} />
                    <Route path='/capture' element={<Capture />} />
                </Routes>
            </BrowserRouter>
    )
}

export default App
