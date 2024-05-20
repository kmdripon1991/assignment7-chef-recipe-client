import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Carousel from '../pages/Carousel/Carousel';

const Main = () => {
    return (
        <>
            <Navbar/>
            <Carousel/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Main;