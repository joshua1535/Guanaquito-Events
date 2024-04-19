import React, { useState, useEffect } from 'react';
import './AdminGraphs.module.css';
import logo from '../../assets/logo.png';
import classes from './AdminGraphs.module.css';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';


const AdminGraphs = () => {
  const categories = ["Todos", "Cine", "Conciertos", "Obras de teatro", "Deportes"];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const images1 = {
    'Todos': ['https://i.postimg.cc/jSYFqTwS/imagen-2023-06-04-160806457.png'
      ,'https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png','https://kirbyandtheforgottenland.nintendo.com/assets/images/home/header.jpg',
      'https://i.postimg.cc/3RGLQb8v/imagen-2023-06-04-161025997.png','https://m.media-amazon.com/images/I/719OZIZMTpL._AC_UF894,1000_QL80_.jpg',
      'https://assets-prd.ignimgs.com/2022/09/14/zelda-tears-of-the-kingdom-button-2k-1663127818777.jpg'],
    'Cine': ['https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png'],
    'Conciertos': ['https://i.postimg.cc/3RGLQb8v/imagen-2023-06-04-161025997.png'],
    'Obras de teatro': ['https://i.postimg.cc/jSYFqTwS/imagen-2023-06-04-160806457.png','https://m.media-amazon.com/images/I/719OZIZMTpL._AC_UF894,1000_QL80_.jpg'],
    'Deportes': ['https://assets-prd.ignimgs.com/2022/09/14/zelda-tears-of-the-kingdom-button-2k-1663127818777.jpg'],
  };


  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const navigate = useNavigate();


  const viewGraphHandler = () => {
    navigate('/admin-graphs/graph');
  }

    const viewScannerHandler = () => {
    navigate('/admin-scanner');
    }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    document.title = "Admin Graphs";
}, []);

  return (
    <>
    <div className="flex flex-col justify-between min-h-screen">
        <Header/>
      <div className="flex sm:justify-center flex-col sm:flex-row h-screen bg-dark-blue">

      <div className=" h-max bg-dark-blue pt-4 ">
            <div className="flex flex-col md:flex-row m-0 px-4  w-full md:w-full justify-center items-center">
              <div className='w-full'>
                  <input 
                      placeholder='Buscar eventos Ej. Super Mario Bros' 
                      className='w-full md:w-ful  rounded-md p-2 bg-white'
                  />
              </div>
          </div>
        
          <div className="flex 
          PC-1920*1080:space-x-10
          PC-1920*1080:pt-4
          PC-1600*900:space-x-7
           p-0 flex-wrap  sm:space-x-4 justify-center">
            {images1[selectedCategory].map((imgSrc, index)=> (
              <div className=" p-4 rounded-lg m-2 sm:m-0" key={index}>
                <img 
                src={imgSrc} alt="Imagen de evento"
                className="
                    m-auto
                  PC-1920*1080:w-56 PC-1920*1080:h-80
                  PC-1600*900:w-48 PC-1600*900:h-72
                 w-40 h-56 object-cover mb-2 rounded"/>
                <div className="flex flex-col justify-center">
                <button 
                onClick={viewGraphHandler}
                className="border border-Orange  bg-transparent text-Orange px-14 py-2 my-4 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                style={ { fontFamily: "PoppinsLight" }}
                >Ver estadísticas
                </button>
                <button 
                onClick={viewScannerHandler}
                className="border border-Orange  bg-transparent text-Orange px-14 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                style={ { fontFamily: "PoppinsLight" }}
                >Validar QR
                </button>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
        
      </div>

      
</div>
      </>
  );
};

export default AdminGraphs;
