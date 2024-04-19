import { useUserContext} from '../../Context/userContext';
import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';


// profile menu component
const profileMenuItems = [
  {
      permit: 'Client',
      items: [
          { label: "Mis tickets", url: "/mytickets"},
          { label: "Historial de eventos", url: "/historyevents"},
          { label: "Mis ordenes", url: "/myorders"},
          { label: "Eventos", url: "/events"}
      ]
  },
  {
      permit: 'Event Administrator',
      items: [
          { label: "Administrar eventos", url: "/admin-event"},
          { label: "Crear evento", url: "/admin-event/createevent"}
      ]
  },
  {
    permit: 'Admin',
    items: [
        { label: "Administrar usuarios", url: "/admin-users"}
    ]
  },
  {
    permit: 'Stadistics',
    items: [
        { label: "Gestionar eventos", url: "/admin-graphs"},
        { label: "Validar QR", url: "/admin-scanner"}
    ]
  } 
];

const filterItems = ( permitList)=> {
  const map = new Map();   
  profileMenuItems.forEach(( permitGroup ) => {
    //const isLastItem = key === profileMenuItems.length - 1;
    if (permitList.includes(permitGroup.permit))
      permitGroup.items.forEach((l)=>{
        map.set(l.label, l);
      });
    })
    
    return  Array.from(map.values());
}

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUserContext();
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  console.log(useUserContext());

  useEffect(() => {
    //console.log(user.permitList);
    
    if(user && user.permitList)
    setMenuItems(filterItems(user.permitList));
  else
  setMenuItems([]);
  console.log( user );
  }, [user]); 

  const handleMenu = (url) => {
      closeMenu();
      navigate(url);
    };
    
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
  
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
        
          {menuItems.map(({label, url}) => {
            return <Typography
              key={label}
              as="a"
              href="#"
              variant="lg"
              color="white"
              className="font-normal">
              <MenuItem 
              onClick={() => handleMenu(url)}
              className="flex items-center text-blue-gray-500 gap-2 lg:rounded-full">
                {label}
              </MenuItem>
            </Typography>
            })
          }

          {
            <MenuItem
            key={"Sign Out"}
            onClick={() => {
              logout();
              handleMenu("/");}}
            className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10">
            
            <Typography
              as="span"
              variant="lg"
              className="font-normal"
              color="red">
              {"Sign Out"}
            </Typography>
          </MenuItem>
          }
        </MenuList>
      </Menu>
    );
  }
  

