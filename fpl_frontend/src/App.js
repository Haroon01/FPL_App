import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // this css needed for bootstrap-react
import { Route, Routes, BrowserRouter } from "react-router-dom"

// pages / components
import Home from './pages/Home'
import Header from './components/Header';
import NotFound from './pages/Notfound';
import Team from './pages/Team';

function App() {
    const style = {
        marginTop:"56px",
        minHeight: "100vh"
    }
    return (
        <div>
            <Header />
            <div style={style}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/team' element={<Team />} />

                        <Route path="*" element={ <NotFound /> } />
                    </Routes>
                </BrowserRouter>
                
            </div>
            
        </div>

    )
}

export default App;
