import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';
import Startup from './pages/Startup';
import Item from './Component/Item';


const App = () => {
    return(
        <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Startup/>} />
            <Route path="/welcome" element={<Item/>} />
        </Routes>
        </BrowserRouter>
         
    );
};

export default App;
