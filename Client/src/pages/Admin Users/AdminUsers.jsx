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
import Header from "../../Components/Header/Header";


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
        <Header/>
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