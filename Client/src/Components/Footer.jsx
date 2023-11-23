import React from 'react';
import { Typography } from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Asegúrate de reemplazar 'path_to_logo' con la ruta correcta al archivo de logo

const Footer = ({additionalClasses}) => (
  <footer className={`bg-bluefooter text-white mt-5 py-3 px-6 text-center ${additionalClasses}`}>
    <div className='relative mx-auto flex mb-5 items-center text-white'>        
      <img src={logo} alt="logo" className="h-12 w-12 mr-2 mb-2" />
      <Typography
        as="a"
        href="#"
        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
      >
        Guanaco Business
      </Typography>
    </div>
        <p className='h-max w-max text-sm text-gray-500'>
        © 2023 Copyright
        </p>
    <div className='flex justify-start content-start'>
    </div>
    <div className='flex justify-end content-end'>
      <FaFacebook className='mr-2 w-8 h-8' />
      <FaTwitter className='mr-2 ml-2 w-8 h-8' />
      <FaInstagram className='mr-2 ml-2 w-8 h-8' />
    </div>
  </footer>
);

export default Footer;