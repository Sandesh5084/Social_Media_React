import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Pages/Navbar';
import './Route.css';
import { useState, createContext } from 'react';
import SignUp from './Pages/SignUp';
import Createpost from './Pages/CreatePost/Createpost';
import styled from 'styled-components';
import Logo from './Pages/logo';

export const AppContext = createContext();

const MainContainer = styled.div`
  background-color: #EFEFFA; 
  min-height: 100vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

function MainRoute() {
    let [name, setname] = useState("");

    return (
        <MainContainer>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/Createpost' element={<Createpost />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path='/Logo' element={<Logo />}></Route>
                    <Route path='*' element={<div>NO PAGE FOUND</div>} />
                </Routes>
            </Router>
        </MainContainer>
    )
}

export default MainRoute;
