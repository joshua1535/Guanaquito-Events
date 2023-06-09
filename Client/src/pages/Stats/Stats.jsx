import React, { useState, useEffect } from "react";
import {
  Carousel,
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import imgtemplate from "../../assets/loginimg.png";
import classes from "./Stats.module.css";
import {
    ChevronDownIcon,
    Bars2Icon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';

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

  const data = [
    { value: 50, label: 'Enero', color: 'border-red-500' },
    { value: 70, label: 'Febrero', color: 'border-blue-500' },
    { value: 30, label: 'Marzo', color: 'border-green-500' },
    { value: 90, label: 'Abril', color: 'border-yellow-500' },
    { value: 40, label: 'Mayo', color: 'border-purple-500' },
];

const maxValue = Math.max(...data.map(item => item.value));

const BarChart = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  const chartHeight = windowWidth >= 1800 && windowWidth <= 2000 ? 800 :
                        windowWidth >= 1600 && windowWidth < 1800 ? 750 :
                        windowWidth >= 1366 && windowWidth < 1600 ? 630 : 
                        windowWidth >= 1000 && windowWidth < 1366  ? 400 : 
                        windowWidth >= 640 && windowWidth < 1000  ? 250 :
                        windowWidth >= 500 && windowWidth < 640  ? 200 :
                        300;

  return (
      <div className="w-full h-full flex justify-around items-end">
          {data.map((item, index) => (
              <div
                  key={index}
                  className={`w-1/6 flex flex-col items-center`}
              >
                  <div
                      className={`w-full border-2 ${item.color} flex justify-center PC-1920*1080: items-center`}
                      style={{height: `${(item.value/maxValue)*chartHeight}px`}}
                  >
                      <p 
                      style={{ fontFamily: "Poppins" }}
                      className="
                      PC-1920*1080:text-2.5xl
                      PC-1600*900:text-2.5xl
                      PC-1366*768:text-2xl
                      PC-1280*720:text-xl
                      text-white">{item.value}</p>
                  </div>
                  <p 
                  style={{ fontFamily: "Poppins" }}
                  className="
                  PC-1920*1080:text-2.5xl
                  PC-1600*900:text-2xl
                  PC-1366*768:text-2xl
                  PC-1280*720:text-xl
                  PC-800*600:text-xs
                  text-center text-Orange mt-2">{item.label}</p>
              </div>
          ))}
      </div>
  );
};

const YAxis = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  const chartHeight = windowWidth >= 1800 && windowWidth <= 2000 ? 800 :
                        windowWidth >= 1600 && windowWidth < 1800 ? 750 :
                        windowWidth >= 1366 && windowWidth < 1600 ? 630 : 
                        windowWidth >= 1000 && windowWidth < 1366  ? 400 : 
                        windowWidth >= 640 && windowWidth < 1000  ? 250 :
                        windowWidth >= 500 && windowWidth < 640  ? 200 :
                        300;

  const values = Array.from({length: 6}, (_, i) => i * (maxValue / 5));
  return (
      <div className="h-full flex flex-col justify-between items-start mr-2" style={{height: `${chartHeight}px`}}>
          {values.reverse().map((val, index) => (
              <div key={index}>
                  <p                     
                  className="
                  PC-1920*1080:text-2.5xl
                  PC-1600*900:text-2xl
                  PC-1366*768:text-2xl
                  PC-1280*720:text-xl
                  text-Orange ms-2" 
                  style={{ fontFamily: "Poppins" }}
                  >{val}</p>
              </div>
          ))}
      </div>
  );
};



function StatsPage() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
   
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

      <div className="h-full w-full bg-darkless-blue">
            <div className="flex justify-between darkless-blue">
                <button 
                style={{ fontFamily: "Poppins" }}
                className=" 
                PC-1920*1080:text-2.5xl
                PC-1600*900:text-2.5xl
                PC-1366*768:text-2xl
                PC-1280*720:text-2xl 
                Mobile-390*844:text-xs
                text-left
                w-1/3 bg-orange-600 text-dark-blue   py-2 px-6"
                >Ventas Tiers</button>
                <button
                style={{ fontFamily: "Poppins" }}
                className="
                PC-1920*1080:text-2.5xl
                PC-1600*900:text-2.5xl
                PC-1366*768:text-2xl
                PC-1280*720:text-2xl 
                Mobile-390*844:text-xs
                text-left
                w-1/3 bg-dark-blue text-Orange py-2 px-6">Individual Grupo</button>
                <button
                style={{ fontFamily: "Poppins" }}
                className="
                PC-1920*1080:text-2.5xl
                PC-1600*900:text-2.5xl
                PC-1366*768:text-2xl
                PC-1280*720:text-2xl 
                Mobile-390*844:text-xs
                text-left
                w-1/3 bg-dark-blue text-Orange py-2 px-6">Hora/Tickets</button>
            </div>

            <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-1/2 h-full">
                    <div className="
                     mt-2 h-full flex">
                        <YAxis />
                        <div className="h-full mt-2 w-full flex flex-col justify-end">
                            <BarChart />
                            <div className="h-10"></div>
                        </div>
                    </div>
                </div>

                <div className="sm:w-2/3 flex justify-center">
                <div className="
                PC-800*600:px-10
                PC-640*480:px-2
                Mobile-390*844:px-2 Mobile-390*844:w-4/5
                sm:w-2/3 rounded-2xl my-5 bg-dark-blue px-20 text-center  p-4 darkless-blue">
                    <h2 
                    style={{ fontFamily: "Poppins" }} 
                    className="
                    PC-1920*1080:text-3xl PC-1920*1080:mt-20 PC-1920*1080:mb-4
                    PC-1600*900:text-3xl PC-1600*900:mt-20 PC-1600*900:mb-4
                    PC-1366*768:text-2.5xl PC-1366*768:mt-20 PC-1366*768:mb-4
                    PC-1280*720:text-2xl PC-1280*720:mt-5 PC-1280*720:mb-1
                    PC-800*600:text-xl PC-800*600:mb-1
                    PC-640*480:text-lg PC-640*480:mb-1
                    Mobile-390*844:text-xl Mobile-390*844:mb-1

                    text-center text-Orange text-2xl font-bold mb-2">Tickets vendidos</h2>
                    <p 
                    style={{ fontFamily: "PoppinsSemiBold" }} 
                    className="
                    PC-1920*1080:text-3xl
                    PC-1600*900:text-2.5xl
                    PC-1366*768:text-2xl
                    PC-1280*720:text-xl PC-1280*720:pe-0  PC-1280*720:mb-10
                    PC-800*600:text-xs PC-800*600:pe-0  PC-800*600:mb-2
                    PC-640*480:text-xs PC-640*480:pe-0  PC-640*480:mb-2
                    Mobile-390*844:text-2xl Mobile-390*844:pe-0  Mobile-390*844:mb-2
                    text-center text-white pe-10 text-2.5xl mb-4">250,452 de 300,000 disponibles</p>

                    <h2 
                    style={{ fontFamily: "Poppins" }} 
                    className="
                    PC-1920*1080:text-3xl PC-1920*1080:mt-20 PC-1920*1080:mb-4
                    PC-1600*900:text-3xl PC-1600*900:mt-20 PC-1600*900:mb-4
                    PC-1366*768:text-2.5xl PC-1366*768:mt-20 PC-1366*768:mb-4
                    PC-1280*720:text-2xl PC-1280*720:mt-5 PC-1280*720:mb-1
                    PC-800*600:text-xl PC-800*600:mt-5 PC-800*600:mb-1
                    PC-640*480:text-lg PC-640*480:mt-5 PC-640*480:mb-1
                    Mobile-390*844:text-xl Mobile-390*844:mt-5 Mobile-390*844:mb-1
                    text-center text-Orange text-2xl font-bold mb-2">Ventas totales</h2>
                    <p 
                    style={{ fontFamily: "PoppinsSemiBold" }} 
                    className="
                    PC-1920*1080:text-3xl PC-1920*1080:mt-5
                    PC-1600*900:text-2.5xl PC-1600*900:mt-5
                    PC-1366*768:text-2xl PC-1366*768:mt-5
                    PC-1280*720:text-xl PC-1280*720:pe-0 PC-1280*720:mb-10
                    PC-800*600:text-xs PC-800*600:pe-0 PC-800*600:mb-2
                    PC-640*480:text-xs PC-640*480:pe-0 PC-640*480:mb-2
                    Mobile-390*844:text-2xl Mobile-390*844:pe-0 Mobile-390*844:mb-2
                  text-white text-2xl mb-4">$1,550,452</p>

                    <h2 
                    style={{ fontFamily: "Poppins" }} 
                    className="
                    PC-1920*1080:text-3xl PC-1920*1080:mt-20 PC-1920*1080:mb-4
                    PC-1600*900:text-3xl PC-1600*900:mt-20 PC-1600*900:mb-4
                    PC-1366*768:text-2.5xl PC-1366*768:mt-20 PC-1366*768:mb-4
                    PC-1280*720:text-2xl PC-1280*720:mt-5 PC-1280*720:mb-1
                    PC-800*600:text-xl PC-800*600:mt-5 PC-800*600:mb-1
                    PC-640*480:text-lg PC-640*480:mt-5 PC-640*480:mb-1
                    Mobile-390*844:text-xl Mobile-390*844:mt-5 Mobile-390*844:mb-1
                    text-center text-Orange text-2xl font-bold mb-2">Tickets canjeados</h2>
                    <p 
                    style={{ fontFamily: "PoppinsSemiBold" }} 
                    className="
                      PC-1920*1080:text-3xl PC-1920*1080:mt-5
                      PC-1600*900:text-2.5xl PC-1600*900:mt-5
                      PC-1366*768:text-2xl PC-1366*768:mt-5
                      PC-1280*720:text-xl PC-1280*720:pe-0 PC-1280*720:mb-10
                      PC-800*600:text-xs PC-800*600:pe-0 PC-800*600:mb-2
                      PC-640*480:text-xs PC-640*480:pe-0 PC-640*480:mb-2
                      Mobile-390*844:text-2xl Mobile-390*844:pe-0 Mobile-390*844:mb-2
                     text-white text-2.5xl mb-4">249,452 de 250,452 vendidos</p>
                </div>

                </div>

            </div>
        </div>
    </>
  );
  
}

export default StatsPage;
