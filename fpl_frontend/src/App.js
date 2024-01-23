import './index.css';
import { Route, Routes, BrowserRouter } from "react-router-dom"

// pages / components
import Home from './pages/Home'
import Header from './components/Header';
import NotFound from './pages/Notfound';
import Team from './pages/Team';
import Login from "./pages/Login"

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/team' element={<Team />} />
                <Route path='/login' element={<Login />} />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
            
            

    )

}

export default App;
