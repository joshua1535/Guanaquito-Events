import React, { useState, useEffect } from "react";
import {Navbar,Menu,MenuHandler,MenuList,MenuItem,Avatar,IconButton,Card,CardHeader,Input,Typography,Button,CardBody,Chip,CardFooter,Tabs,TabsHeader,Tab,Tooltip} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import imgtemplate from "../../assets/loginimg.jpg";
import classes from "./AdminUsers.module.css";
import {
    ChevronDownIcon,
    ChevronDoubleRightIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { userService } from "../../Services/userService";
import { useUserContext } from "../../Context/userContext";
import UsersTable from "../../Components/UsersTable";


//profile menu component
const profileMenuItems = [
  {
    label: "Administrar usuarios",
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
  if (label === "Administrar usuarios") {
      navigate('/admin-users');
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
export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState(4);
    const {user, token } = useUserContext(); // obteniendo token de contexto de usuario

    const navigate = useNavigate();

    useEffect(() => {
      if(token){
        userService.getAllUsers(page, size, token)
            .then((data) => {
              setUsers(data.content)        
              setLastPage(data.total_pages);
              setTotalElements(data.total_elements);
                console.log('Los usuarios obtenidos:', data.content);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener los usuarios:', error);
            });
        }
    }, [page, size, token, totalElements]); 

  
      const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < lastPage) {
          setPage(newPage);
        }
      };
  
      const handleFirstPage = () => handlePageChange(0);
      const handlePrevPage = () => handlePageChange(page - 1);
      const handleNextPage = () => handlePageChange(page + 1);
      const handleLastPage = () => handlePageChange(lastPage - 1);


    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);
  
    useEffect(() => {
      document.title = "Admin Users";
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
          
          <ProfileMenu />
          </div>
        </Navbar>
        </header>
      <div className={[classes["bodyContainer"]]}>
        <div className={[classes["titleContainer"]]}>
          <Typography variant="h1" className={[classes["title"]]}>
            Administrar usuarios
          </Typography>
        </div>
        <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent Mobile-390*844:my-4 Mobile-280:my-4 ">
      </CardHeader>
          <UsersTable users={users} navigate={navigate}/>
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
    </div>
  );
}