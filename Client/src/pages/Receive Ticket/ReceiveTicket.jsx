import './ReceiveTicket.module.css';
import classes from './ReceiveTicket.module.css';
import logo from '../../assets/logo.png';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
    Input,
    Collapse,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../../Services/ticketService';
import { useUserContext } from '../../Context/userContext';
import Header from '../../Components/Header/Header';

export default function TransferTicket() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [generateCode, setGenerateCode] = useState(false);
    const [ticketCode, setTicketCode] = useState("");
    const { user, token} = useUserContext();

    const navigate = useNavigate();

    const backButtonHandler = () => {
        navigate(-1);
    }

    const confirmTransferHandler = () => {
      ticketService.transferTicket({
        newUserOwnerCode: "",
        transferCode: ticketCode
      }, token)
      .then(response => {
        console.log('Ticket transferido con exito: ', response);
        navigate('/mytickets');
      })
      .catch(error => {
        console.log('Error al transferir ticket: ', error);
      })
    }

    const generateCodeHandler = () => {
        setGenerateCode(true);
    }

    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "Create Event";
        }, []);

        useEffect(() => {
          console.log(generateCode);
        }, [generateCode]);

    return (
        <div className={[classes["generalContainer"]]}>
        <Header/>
        <div className={[classes["bodyContainer"]]}>
            <div className={[classes["formContainer"]]}>
      <div className={[classes["form"]]}>
      <div className={[classes["titleContainer"]]}>
                <h1 className={[classes["title1"]]}>
                Solicite el código de transferencia a la persona 
                a la que desea ceder la titularidad del/os ticket(s)
                </h1>
            </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="eventName" className={[classes["titleInputs"]]}>
              Codigo de transferencia
            </label>
            <Input
              id="eventName"
              type="text"
              color='white'
              value={ticketCode}
              onChange={ticket => setTicketCode(ticket.target.value)}
              placeholder="XXX-XXX-XXX"
            />
          </div>   
          <div className="flex space-x-4 justify-end Mobile-280:justify-center ">
            <Button 
            onClick={backButtonHandler}
            className='bg-black Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Cancelar
            </Button>
            <Button 
            onClick={confirmTransferHandler}
            className='bg-yellowCapas Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Recibir
            </Button>
          </div>
        </form>
      </div>
    </div>
        </div>
        </div>
    )
}

