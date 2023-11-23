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

import { Toaster, toast } from 'sonner';
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Header from '../../Components/Header/Header';

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

        toast.success('Ticket validado con exito', { 
          duration: 5000,
          icon: <CheckCircleIcon style={{color: "green"}} />,
          position: "top-right",
      });
      })
      .catch(err => {
        setError(true);

        toast.error('Ticket invalido', {
          duration: 5000,
          icon: <XCircleIcon style={{color: "red"}} />,
          position: "top-right",
        });

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
        <Header/>
        <Toaster />
    <div className="flex flex-col items-center px-4 sm:px-0 ">
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
              <p className={[classes["titleEventText"]]}>Código del Ticket</p>  
              <input 
                      placeholder={'Codigo'} 
                      className='w-full my-3 text-center  rounded-md p-2 bg-white' 
                      type='text'                 
                  /> 
                <div className='flex justify-center'>
                <button
                    style={ { fontFamily: "Poppins" }}
                    className='w-44 h-10 px-8 mb-5 mr-0 md:mr-4 rounded-lg text-white bg-Orange hover:bg-yellow-700'>
                      Validar
                </button>
                </div>
            </div>
        </div>

        </>
    );
}


export default TicketValidationPage;
