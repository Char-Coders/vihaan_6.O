import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Test from './Test'

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/capture' element={<Test />} />
                </Routes>
            </BrowserRouter>
    )
}

export default App
