import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from "../Context/userContext";
import { registerService } from "../Services/registerService";
import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import classes from "../pages/My Tickets/MyTickets.module.css";


export default function TicketItem({ ticket }) {
    const { eventTitle, eventPicture, eventDate, ticketTier, available, time } = ticket;
    const { user, token} = useUserContext();

    const navigate = useNavigate();
    
    const redeemTicketHandler = (eventCode, ticketCode, ticketTier) => {

      registerService.getRegisterByTicketCode(ticketCode, token)
      .then((register) => {
         //Obtener el primer elemento del array
        register = register[0];
        console.log(register);
         //Si el registro del ticket no existe
         if (register === undefined) {
          const uuid = uuidv4();
          registerService.saveTicket(ticketCode, uuid, token);
          navigate(`/qr/${eventCode}/${ticketCode}/tier/${ticketTier}/register/${uuid}`);
        }
        //Si el registro del ticket existe
        
        registerService.getStatus(token, ticketCode, register?.transactionCode)
        .then((status) => {
        


          console.log(status.remainingMinutes);
          console.log(status.remainingSeconds);
          console.log(register.transactionCode);
       
        //Si el ticket ya fue validado, no se puede volver a validar
        if(register.validationTime !== null){
          alert('El ticket ya fue validado');
          return;
        }

        //Si el QR ya fue generado, pero aun tiene tiempo de validez
        else if (status.remainingMinutes !== null && (register.remainingMinutes !== 0 && register.remainingSeconds !== 0) && status.remainingSeconds !== null &&  register.transactionCode !== null) {
          console.log ("El QR ya fue generado, pero aun tiene tiempo de validez");
          navigate(`/qr/${eventCode}/${ticketCode}/tier/${ticketTier}/register/${register.transactionCode}`);
        }

        //Si el QR ya fue generado, y ya expiró
        else if (status.remainingMinutes === null  && status.remainingSeconds === null &&  register.transactionCode !== null) {
          const uuid = uuidv4();
          registerService.updateTransactionCode(uuid.toString(), ticketCode, token);
          navigate(`/qr/${eventCode}/${ticketCode}/tier/${ticketTier}/register/${uuid}`);
        }


      }
      
      )
      .catch((err) => {
        console.log(err);
      });
    })

    };

    const transferTicketHandler = () => {
      navigate("/transferticket");
    };
  
    return (
      <div className={[classes["cardTicketContainer"]]}>
         <div >
            {!available ? (
              <Chip variant='ghost' color="red" value='Canjeado' className="m-auto p-2 font-text">
              </Chip>
            ) : (
              <Chip variant='ghost' color="green" value='Disponible' className="m-auto p-2 font-text">
              </Chip>
            )}     
          </div>
        <Card className="shadow-none p-2">
         
          <img src={eventPicture} alt={eventTitle} className={[classes["cardImg"]]} />
          <div className="p-4">
            <div className={[classes["textCardContainer"]]}>
              <Typography 
              className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Fecha:
              </Typography>
              <Typography 
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {eventDate}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography 
            className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Hora:
              </Typography>
              <Typography
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {time}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography
            className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Evento:
              </Typography>
              <Typography 
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text break-words
                hover:break-all w-36 h-7 overflow-auto">
                {eventTitle}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography 
            className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Ubicación:
              </Typography>
              <Typography
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {ticketTier}
              </Typography>
            </div>
            <div className="flex items-center justify-between mt-4">
              {available && (
                <Button
                    onClick={() => redeemTicketHandler(ticket.eventCode, ticket.ticketCode, ticketTier)}
                    variant="filled"
                    color="amber"
                    className="font-text"
                >
                    Canjear
                </Button>

              )}
                {available && (
                <Button
                    onClick={() => transferTicketHandler()}
                    variant="outlined"
                    color="blue"
                    className="font-text ml-2 w-auto h-auto"
                >
                    Transferir
                </Button>

                )}

            </div>
          </div>
        </Card>
      </div>
    );
  }