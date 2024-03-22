import './index.css';
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter,  } from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute';

// pages / components
import Home from './pages/Home'
import Header from './components/Header';
import NotFound from './pages/Notfound';
import Team from './pages/Team';
import CurrentTeam from './pages/CurrentTeam';
import Login from "./pages/Login"
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import FaqPage from './pages/FaqPage';
import SearchPlayers from './pages/SearchPlayers';

function App() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>} />
                <Route path='/team' element={<Team />} />
                <Route path='/currentteam' element={<CurrentTeam />} />
                <Route path='/login' element={React.cloneElement(<Login />, { setIsLoggedIn })} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/faq' element={<FaqPage />} />
                <Route path='/players/search' element={<SearchPlayers />} />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
            
            

    )

}

export default App;
