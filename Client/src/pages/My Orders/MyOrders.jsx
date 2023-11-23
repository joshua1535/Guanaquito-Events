import React, { useState } from 'react';
import './MyOrders.module.css';
import classes from './MyOrders.module.css';
import logo from '../../assets/logo.png';
import { useEffect } from "react";
import {Navbar,Menu,MenuHandler,MenuList,MenuItem,IconButton,Typography,Button,Avatar,Collapse} from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
    ChevronDoubleRightIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { orderService } from '../../Services/orderService';

import OrderTable from '../../Components/OrderTable';
import Footer from '../../Components/Footer';
import monoGif from '../../assets/imgs/monoGif.gif';
import Header from '../../Components/Header/Header';

export default function MyOrders(){

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { user, token} = useUserContext();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [lastPage, setLastPage] = useState(false);
    const [totalElements, setTotalElements] = useState(0);

    const handleNextPage = () => {
      if(page < lastPage-1) {
        setPage(page + 1);
      }
    }

    const handlePreviousPage = () => {
      if(page > 0) {
        setPage(page - 1);
      }
    }

    const handleFirstPage = () => {
      setPage(0);
    }

    const handleLastPage = () => {
      setPage(lastPage-1);
    }


    useEffect(() => {
      if(token) {

        orderService.getOrdersByUser(token, size, page)
        .then((response) => {
          setOrders(response.content);
          setTotalElements(response.total_elements);
          setLastPage(response.total_pages);
        }
        )
        .catch((error) => console.log(error));
      }

    }, [token, page, size]);

    useEffect(() => {
      console.log (orders);
      console.log (lastPage);
      console.log (totalElements);

    }, [orders, lastPage, totalElements]);


    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "My Orders";
        }, []);
    
        return (
            <div className={[classes["generalContainer"]]}>
        <Header/>
        <div className={[classes["bodyContainer"]]}>
        <h1 className={[classes["title"]]}>Mis Ordenes</h1>
        {orders.length === 0 ? (
          <div className="text-white text-3xl flex flex-col items-center">
          <p className="mb-4">EL DIAVLO, NO HAY ORDENES</p>
          <img className="mx-auto" src={monoGif} alt="GIF" />
        </div>
        ) : (
          <div className={[classes["tableContainer"]]}>
            <OrderTable orders={orders} />
          </div>
        )}
        {/* Esconder la paginacion si no hay ordenes */}
        {orders.length > 0 && (
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
              onClick={handlePreviousPage}
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
        )}
            </div>
            <Footer />
    </div>
        );
    };

