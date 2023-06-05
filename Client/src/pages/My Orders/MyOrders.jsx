import React from 'react';
import './MyOrders.module.css';
import classes from './MyOrders.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import { useEffect } from "react";
import {
    Carousel,
    Navbar,
    MobileNav,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Chip,
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    Tooltip,
    Input,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
  } from "@heroicons/react/24/outline";

  import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Evento", "Fecha", "Localidad", "Precio", "Total"];

const orders = [
  {
    numeroOrden: 8526205849,
    fecha: '2023-03-03',
    tickets: [
      { evento: 'Marito bros', fecha: '2023-06-10', localidad: 'VIP', precio: 50.05, img: 'https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg' },
      { evento: 'Marito bros', fecha: '2023-06-10', localidad: 'VIP', precio: 40.00, img: 'https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg' },
    ],
  },
  { 
    numeroOrden: 2659933140,
    fecha: '2023-05-05',
    tickets: [
      { evento: 'Deje Capas', fecha: '2023-06-20', localidad: 'Ultra VIP', precio: 59.99, img: 'https://static.13.cl/7/sites/default/files/esports/articulos/field-image/maxresdefault.jpg' },
    ],
  },
];

orders.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

const TABLE_ROWS = orders.map((order, index) => ({
  numeroOrden: order.numeroOrden,
  fechaOrden: order.fecha,
  tickets: order.tickets.map(ticket => ({
    evento: ticket.evento,
    fecha: ticket.fecha,
    localidad: ticket.localidad,
    precio: ticket.precio,
    img: ticket.img,
  })),
}));

function OrderTable() {
    return (
      <>
        {TABLE_ROWS.map((order, index) => {
          const total = order.tickets.reduce((total, ticket) => total + ticket.precio, 0);
          const isLast = index === TABLE_ROWS.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
          return (
            <Card className="h-full w-2/3 m-auto mt-5 border-2 border-dark-blue shadow-lg" key={index}>
              <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Typography variant="h5" className='text-blueCapas'>
                      Orden #{order.numeroOrden}
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      Fecha: {order.fechaOrden}
                    </Typography>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography
                            variant="small"
                            className="font-normal leading-none text-blueCapas"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {order.tickets.map((ticket, ticketIndex) => (
                      <tr key={ticketIndex}>
                        <td className={classes}>
                            <div className="flex items-center gap-4">
                            <Avatar src={ticket.img} />
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {ticket.evento}
                          </Typography>
                          </div>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {ticket.fecha}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {ticket.localidad}
                          </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            ${ticket.precio}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="p-4" colSpan={TABLE_HEAD.length - 1}></td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          ${total}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          );
        })}
      </>
    );
  }

// profile menu component
const profileMenuItems = [
    {
      label: "Mis tickets",
    },
    {
      label: "Historial de eventos",
    },
    {
      label: "Transferir ticket",
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
                onClick={closeMenu}
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
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
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
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
      </header>
        <div className={[classes["bodyContainer"]]}>
        <h1 className={[classes["title"]]}>Mis Ordenes</h1>
        <div className={[classes["tableContainer"]]}>
            <OrderTable/>
        </div>
            </div>
    </div>
        );
    };

