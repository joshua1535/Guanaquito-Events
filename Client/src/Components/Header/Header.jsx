import { useUserContext} from '../../Context/userContext';
import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Collapse,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import classes from "../../pages/HomePage/HomePage.module.css";
import {
    ChevronDownIcon,
    Bars2Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';


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
      label: "Eventos", url: "/events"
    },
    {
      label: "Mis tickets", url: "/mytickets"
    },
  ];
  
  function NavList() {
    const navigate = useNavigate();
    
    const navListHandler = (url) => {
        navigate(url);
    };
  
  
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />
        {navListItems.map(({ label, url}, key) => (
          <Typography
            key={label}
            as="a"
            href="#"
            variant="lg"
            color="white"
            className="font-normal"
          >
            <MenuItem 
            onClick={() => navListHandler(url)}
            className="flex items-center gap-2 lg:rounded-full">
              {label}
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }


export const  Header = ({role, children, darkMode = false}) => {
    const { user } = useUserContext();
    console.log(useUserContext);

    //if(!token) return <Navigate replace to="/"/>;
    //if(!user || !user.permits.some(permit => permit.name === role)) return <Navigate replace to="*"/>;
            
    const [isClient, setIsClient] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    
    useEffect(() => {
      console.log(user);

      if(user && user.permitList.includes("Client"))
        setIsClient(true)
      else
        setIsClient(false)
    }, [user]); 

    return (
        <header className={"sticky top-0 z-10 overflow-hidden" + (!darkMode ? " bg-white" : "")}>
          <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
            <div className={[classes["headerTypography"]]}>
              <img src={logo} alt="logo" className="h-12 w-12 mx-4" />
              
              <Typography
                as="a"
                href="#"
                className={"mr-auto cursor-pointer py-1.5 font-medium text-white" + (darkMode ? " text-xl hidden sm:inline-block":" ml-2")}
                style={darkMode ? { fontFamily: "PoppinsLight" } :{ fontFamily: "Roboto, sans-serif" }}>
                  Guanaco Business
              </Typography>
            
              {isClient && <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                <NavList />
              </div>}
              
              {isClient && <IconButton
                size="sm"
                color="blue-gray"
                variant="text"
                onClick={toggleIsNavOpen}
                className="mr-2 lg:hidden">
                <Bars2Icon className="h-6 w-6" />
              </IconButton>}

              <ProfileMenu />
            </div>
            {isClient && <Collapse open={isNavOpen} className="overflow-scroll">
              <NavList />
            </Collapse>}
          </Navbar>
        </header>
    )
}

 
export default Header;