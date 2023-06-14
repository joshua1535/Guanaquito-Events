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
  Dialog,
  DialogHeader,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import imgtemplate from "../../assets/loginimg.png";
import classes from "./ModifyStaff.module.css";
import {
    ChevronDownIcon,
    Bars2Icon,
    ArrowLeftIcon,
    MinusIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';



const usersStaff = [
    {
        email: "danyfifitax@gmail.com",
        rol: ["Admin", "Scanner"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
    {
        email: "joshuamontano@gmail.com",
        rol: ["Admin", "Graficas"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
    {
        email: "jonathanmorales@gmail.com",
        rol: ["Scanner"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
    {
        email: "dasdsadasdx@gmail.com",
        rol: ["Admin", "Scanner"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
    {
        email: "danyfiasdasd12asdax@gmail.com",
        rol: ["Admin", "Scanner"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
    {
        email: "jonathaasdasdasd2s@gmail.com",
        rol: ["Scanner"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
    {
        email: "jonathanm213123dales@gmail.com",
        rol: ["Scanner"],
        avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
    },
];

const usersInEventDefault = [
        {
            email: "jonathanmor215125ales@gmail.com",
            rol: ["Scanner"],
            avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
        },
        {
            email: "jonathanmoral616es@gmail.com",
            rol: ["Scanner"],
            avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
        },
        {
            email: "danyfifit251515ax@gmail.com",
            rol: ["Admin", "Scanner"],
            avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
        },
        {
            email: "danyfifitasdad231ax@gmail.com",
            rol: ["Admin", "Scanner"],
            avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
        },
        {
            email: "danyfifita2qwasdax@gmail.com",
            rol: ["Admin", "Scanner"],
            avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
        },
];
        

// profile menu component
const profileMenuItems = [
  {
    label: "Gestionar eventos",
  },
  {
    label: "Crear evento",
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
      navigate('/admin-event');
  } else if (label === "Crear evento") {
      navigate('/admin-event/createevent');
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

export default function ModifyStaff() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(usersStaff);
    const [selectedUser, setSelectedUser] = useState("");
    const [userList, setUserList] = useState([]);
    const [usersInEvent, setUsersInEvent] = useState(usersInEventDefault);
    const [alreadyInList, setAlreadyInList] = useState(false);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);
  
    useEffect(() => {
      document.title = "Modify Staff";
    }, []);
  
    const handleAddUser = () => {

        if (userList.includes(selectedUser)) {
          setAlreadyInList(true);
          return;
        }


        if (selectedUser) {
          const selectedUserObj = usersStaff.find((user) => user.email === selectedUser);

          setUserList((cur) => [...cur, selectedUser]);
      
          const newUsersInEvent = [
            ...usersInEvent,
            selectedUserObj
          ];

          setUsersInEvent(newUsersInEvent);
        }
        
        setSelectedUser("");
      
        const newUsers = usersStaff.filter((user) => user.email !== selectedUser);
        setFilteredUsers(newUsers);
      
        if (searchValue) {
          const filteredUsers = newUsers.filter((user) =>
            user.email.includes(searchValue)
          );
          setFilteredUsers(filteredUsers);
        }
      };

      const handleRemoveUser = (email) => {
        const newUsersInEvent = usersInEvent.filter((user) => user.email !== email);
        setUsersInEvent(newUsersInEvent);
      }


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
      <IconButton 
      onClick={handleBackClick}
      size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                <ArrowLeftIcon className="h-6 w-6 text-white" />
            </IconButton>
      <div className={[classes["bodyContainer"]]}>
      <div className={[classes["imgContainer"]]}>
          <img
            src="https://www.coldplay.com/wp/wp-content/uploads/2023/05/cannot-wait.jpg"
            alt="eventImg"
            className={[classes["imgEvent"]]}>
            </img>
        </div>
        <div className={[classes["staffContainer"]]}>
            <div className={[classes["staffAddContainer"]]}>
        <Select
            value={selectedUser}
            onChange={(value) => setSelectedUser(value)}
            className="mb-4 bg-white Mobile-280:w-full"
                >
            {filteredUsers.map((user) => (
              <Option key={user.email} value={user.email}>
                {user.email}
              </Option>
            ))}
          </Select>
          <Button onClick={handleAddUser} className="w-36 bg-green-500 Mobile-280:w-fit"> Agregar </Button>  
          {alreadyInList && 
          //Mostrar popup
          <Dialog open={true} onClose={() => setAlreadyInList(false)} className='Mobile-390*844:w-96 Mobile-280:w-96'>
        <Dialog.Header className='font-text Mobile-390*844:text-base Mobile-280:text-sm'>
          Error
        </Dialog.Header>
        <Dialog.Body className='font-text Mobile-280:text-sm'>
          El usuario ya está en la lista de staff.
        </Dialog.Body>
        <Dialog.Footer className='font-text'>
          <Button onClick = {() => setAlreadyInList(false)}>
            Aceptar
          </Button>
        </Dialog.Footer>
      </Dialog>
          } 
            </div>
          <div className={classes["usersInEventContainer"]}>
            {usersInEvent.map((user) => (
                <div key={user.email} className={classes["userInEvent"]}>
                <IconButton 
                onClick={() => handleRemoveUser(user.email)}
                size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                  <MinusIcon className="h-6 w-6 text-red-600" />
                </IconButton>
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    className="w-auto h-auto "
                />
                <div className={[classes["emailContainer"]]}>
                <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
    </div>
    </div>

    <footer className="  bg-bluefooter text-white mt-5 py-4 px-6 text-center">

      <div className='relative mx-auto flex mb-5 items-center text-white'>        
        <img src={logo} alt="logo" className="h-12 w-12 mr-2 mb-2" />
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
        >
          Guanaco Business
        </Typography>
      </div>
      <p className='h-max w-max text-sm text-gray-500'>
      © 2023 Copyright
      </p>
      <div className='flex justify-start content-start'>
        </div>
      <div className='flex justify-end content-end'>
          <FaFacebook
          className='mr-2 w-8 h-8'

          />

          <FaTwitter
          className='mr-2 ml-2 w-8 h-8'
          />
          <FaInstagram 
          className='mr-2 ml-2 w-8 h-8'
          />

      </div>

      </footer>

    </div>
  );
}