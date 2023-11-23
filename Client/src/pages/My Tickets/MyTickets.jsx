import './MyTickets.module.css';
import classes from './MyTickets.module.css';
import logo from '../../assets/logo.png';
import React, { useState } from "react";
import { useEffect } from "react";
import {Navbar,Typography,Button,Menu,MenuHandler,MenuList,MenuItem,Avatar,IconButton,Collapse} from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronRightIcon,
  } from "@heroicons/react/24/outline";
  
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { ticketService } from '../../Services/ticketService';
import TicketItem from "../../Components/TicketItem";
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';


export default function MyTickets(){

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { user, token} = useUserContext();
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState(6);

    useEffect(() => {
        if(token) {
          ticketService.getTicketsByUser(token, size, page)
          .then((res) => {
            setTickets(res.content);
            setLastPage(res.total_pages);
            setTotalElements(res.total_elements);
          }
          )
          .catch((err) => console.log(err));
        }
      }, [token, page, size]);

      useEffect(() => {
        console.log(totalElements);
        console.log (lastPage);
      }, [totalElements, lastPage]);

      const handleNextPage = () => {
        if (page < lastPage - 1) {
          setPage((cur) => cur + 1);
        }
      };

      const handlePrevPage = () => {
        if (page > 0) {
          setPage((cur) => cur - 1);
        }
      };

      const handleFirstPage = () => {
        setPage(0);
      };

      const handleLastPage = () => {
        setPage(lastPage - 1);
      };



    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "My Tickets";
        }, []);
    
        return (
            <div className={[classes["generalContainer"]]}>
        <Header/>
        <div className={[classes["bodyContainer"]]}>
            <h1 className={[classes["title"]]}>Mis Tickets</h1>
            {/* Boton para poder ir a recibir tickets */}
            <div className='flex justify-center mt-3'>
              <Link to="/receiveticket">
                <Button className='bg-yellowCapas Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844 md:mb-5 hover:bg-yellow-700'>
                  Recibir Ticket
                </Button>
              </Link>
            </div>

            <div className={[classes["cardContainer"]]}>
            {tickets.map((ticket, index) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="flex justify-center items-center my-12">
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handleFirstPage}
        >
          <ChevronDoubleLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handlePrevPage}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Typography children={page + 1} className="mx-8 text-white" />
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handleNextPage}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handleLastPage}
        >
          <ChevronDoubleRightIcon className="h-6 w-6" />
        </Button>
          </div>
        </div>
          <Footer/>    
        </div>
        );
    };
