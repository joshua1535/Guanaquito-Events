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

// profile menu component
const profileMenuItems = [
    {
      label: "Mis tickets",
    },
    {
      label: "Historial de eventos",
    },
    {
      label: "Mis ordenes",
    },
    {
      label: "Eventos",
    },
    {
      label: "Sign Out",
    },
  ];
   
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
  
    const navigate = useNavigate();
    const handleMenu = (label) => {
      if (label === "Sign Out") {
        closeMenu();
        navigate("/");
        
      }
      
      if (label === "Eventos") {
        closeMenu();
        navigate("/events");
      }
  
      if (label === "Mis tickets") {
        closeMenu();
        navigate("/mytickets");
      }
  
      if (label === "Historial de eventos") {
        closeMenu();
        navigate("/historyevents");
      }
  
      if (label === "Mis ordenes") {
        closeMenu();
        navigate("/myorders");
      }
  
  
    };
  
    
    
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
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
                onClick={() => handleMenu(label)}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                <Typography
                  as="span"
                  variant="lg"
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
  
  
   
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   
    const triggers = {
      onMouseEnter: () => setIsMenuOpen(true),
      onMouseLeave: () => setIsMenuOpen(false),
    };
  }
   
    
   
  // nav list component
  const navListItems = [
    {
      label: "Eventos",
    },
    {
      label: "Mis tickets",
    },
  ];
   
  
  
    
  
  
  function NavList() {
    const navigate = useNavigate();
    
    const navListHandler = (label) => {
      if (label === "Eventos") {
        navigate("/events");
      } else if (label === "Mis tickets") {
        navigate("/mytickets");
      }
    };
  
  
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />
        {navListItems.map(({ label}, key) => (
          <Typography
            key={label}
            as="a"
            href="#"
            variant="lg"
            color="white"
            className="font-normal"
          >
            <MenuItem 
            onClick={() => navListHandler(label)}
            className="flex items-center gap-2 lg:rounded-full">
              {label}
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }

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
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
      </header>
        <div className={[classes["bodyContainer"]]}>
        <h1 className={[classes["title"]]}>Mis Ordenes</h1>
        <div className={[classes["tableContainer"]]}>
            <OrderTable orders = {orders}/>
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
            </div>
            <Footer />
    </div>
        );
    };

