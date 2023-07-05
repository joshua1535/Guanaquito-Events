import React, { useState, useEffect } from 'react';
import './TicketValidation.module.css';
import logo from '../../assets/logo.png';
import classes from './TicketValidation.module.css';
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
import { QrReader } from 'react-qr-reader';
import { registerService } from '../../Services/registerService';
import { useUserContext } from '../../Context/userContext';

//profile menu component
const profileMenuItems = [
  {
    label: "Gestionar eventos",
  },
  {
    label: "Validar QR",
  },
  {
    label: "Sign Out",
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const handleMenuClick = (label) => {
  if (label === "Gestionar eventos") {
      navigate('/admin-graphs');
  } else if (label === "Validar QR") {
      navigate('/admin-scanner');
  } else if (label === "Sign Out") {
      navigate('/');
  }
  };
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={ () => handleMenuClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <Typography
                as="span"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
  

  const TicketValidationPage = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [selected, setSelected] = useState("environment");

    const {user, token} = useUserContext();
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);


 



  const handleScan = async (scanData) => {
    if (scanData && scanData !== "") {
      console.log(`Code scanned:`, scanData.text);
      
      registerService.validateTicket(scanData.text, token).then
      (res => {
        console.log(res);
        setValidated(true);
        alert("Ticket validado con exito");
      })
      .catch(err => {
        setError(true);
        alert("Ticket invalido");

        console.log(err);
      }
      )
    }

  };

  const handleError = (err) => {
    console.error(err);
  };


    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);

    return (
        <>
        <header className={[classes["headerContainer"]]}>
        <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
        <div className={[classes["headerTypography"]]}>
          <img src={logo} alt="logo" className="h-12 w-12 mx-4" />
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
          >
            Guanaco Business
          </Typography>
          
          <ProfileMenu />
          </div>
        </Navbar>
        </header>
    <div className="flex flex-col items-center px-4 sm:px-0">
                <div className='w-1/3 
                PC-1920*1080:w-1/3
                PC-1366*768:w-1/3
                PC-1280*720:w-1/3
                PC-1024*768:w-1/3
                PC-800*600:w-1/3
                PC-640*480:w-1/3
                Mobile-390*844:w-4/5 
                Mobile-280:w-4/5
                

                h-auto mt-12'>
                    <>
                      <select 
                      style={ { fontFamily: "Poppins" }}
                      className='w-40 h-10 px-8 rounded-lg text-white bg-Orange justify-center mx-auto flex items-center'
                      onChange={(e) => setSelected(e.target.value)}>
                        <option 
                        value={"environment"}>TRASERA</option>
                        <option value={"user"}>FRONTAL</option>
                      </select>
                      <div className='my-4 border-2 Mobile-390*844:my-20'>
                      <QrReader
                        facingMode={selected}
                        delay={1000}
                        onError={handleError}
                        onResult={handleScan}
                        style={{ width: "900px" }}
                      />
                      </div>
                    </>
                </div>
                

            
            <div className={[classes["codeTicketContainer"]]}>
              <p className={[classes["titleEventText"]]}>Codigo del Ticket</p>  
              <input 
                      placeholder={'Codigo'} 
                      className='w-full md:w-full my-3  rounded-md p-2 bg-white' 
                      type='text'                 
                  /> 
                <div className='flex justify-center'>
                <button
                    style={ { fontFamily: "Poppins" }}
                   className='w-44 h-10 px-8 mb-5 mr-0 md:mr-4 rounded-lg text-white bg-Orange'>
                      Validar
                </button>
                </div>
            </div>
        </div>

        </>
    );
}


export default TicketValidationPage;
