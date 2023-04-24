import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Test from './Test'
import Homepage from './components/home/HomePage'
import SignUp from './components/signUp/signUp'

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/capture' element={<Test />} />
                </Routes>
            </BrowserRouter>
    )
}

export default App
