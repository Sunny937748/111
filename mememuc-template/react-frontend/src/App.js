/**
 * References:
 * https://www.javatpoint.com/browserrouter-in-react
 * */

import './styles/App.css';
import {Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Signup from './pages/Signup';
import Navbar from './pages/Nav';
import LoggedIn from "./pages/LoggedIn";
import MemeMaker from "./pages/MemeMaker";
import SingleView from "./pages/SingleView";
import History from "./pages/History";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path='/about' element={<About/>}/>
                <Route path='/sign-in' element={<Login/>}/>
                <Route path='/' element={<Overview/>}/>
                <Route path='/sign-up' element={<Signup/>}/>
                <Route path='/userDetails' element={<LoggedIn/>}/>
                <Route path='/mememaker' element={<MemeMaker/>}/>
                <Route path='/m/:id' element={<SingleView/>}/>
                <Route path='/my-history' element={<History/>}/>
            </Routes>
        </div>
    );
}

export default App;
