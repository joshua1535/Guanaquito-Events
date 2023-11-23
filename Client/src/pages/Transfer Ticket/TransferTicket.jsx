import React, { useState, useEffect } from 'react';
import './TransferTicket.module.css';
import logo from '../../assets/logo.png';
import classes from './TransferTicket.module.css';
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import { registerService } from '../../Services/registerService';
import Header from '../../Components/Header/Header';

  const TransferTicket = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { user, token} = useUserContext();
    const { eventCode, ticketCode, ticketTier, transactionCode} = useParams();
    const [event, setEvent] = useState(null);
    const [ticket, setTicket] = useState(null);
    const [register , setRegister] = useState(null);

    useEffect(() => {
      if(token) {
        eventService.
        getEventById(eventCode, token).then((event) => setEvent(event));

        registerService.getRegisterByTicketCode(ticketCode, token).then((reg) => {
        if (reg != null){

          registerService.getStatus(token, ticketCode, transactionCode.toString()).then((status) => {
            setRegister(status);
        });
      }
      });
      }
    }, [token]);

    useEffect(() => {

      const interval = setInterval(() => {
        if(register != null){
          if(register.remainingSeconds > 0){
            setRegister({
              ...register,
              remainingSeconds: register.remainingSeconds - 1
            });
          }else{
            if(register.remainingMinutes > 0){
              setRegister({
                ...register,
                remainingMinutes: register.remainingMinutes - 1,
                remainingSeconds: 59
              });
            }else{
              clearInterval(interval);
            }
          }
        }
      }, 1000);
      return () => clearInterval(interval);
      
      
    }, [event, register]);

  
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);

    return (
        <>
        <Header darkMode={true}/>
    <div className="flex flex-col items-center justify-center px-4 sm:px-0">
            <p className={[classes["titleText"]]}>CÓDIGO PARA TRANSFERIR TU TICKET</p>
            <QRCode
              value={transactionCode.toString()}
              size={300}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
              renderAs={"svg"}
              className='mt-24 mb-10'
            >
            </QRCode>
            <p className={[classes["codeText"]]}>{transactionCode.toString()}</p>
            <p className={[classes["titleEventText"]]}>{event?.title}</p>
            <p className={[classes["ticketEventText"]]}>{ticketTier}</p>
            <p className={[classes["titleTimeText"]]}>Tiempo de expiración:</p>
            <div className="flex flex-row justify-center items-center gap-1">
            <p className={[classes["TimeText"]]}>{register?.remainingMinutes}:</p>
            <p className={[classes["TimeText"]]}>{register?.remainingSeconds}</p>
            </div>
        </div>

        </>
    );
}


export default TransferTicket;
