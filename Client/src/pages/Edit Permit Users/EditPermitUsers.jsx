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
  Switch,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import imgtemplate from "../../assets/loginimg.png";
import classes from "./EditPermitUsers.module.css";
import { ChevronDownIcon, Bars2Icon, ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const users = [
  {
    email: "jonathanmor215125ales@gmail.com",
    avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png",
    permits: [
      { name: "Ver estadisticas", active: true },
      { name: "Administrar eventos", active: true },
      { name: "Administrar usuarios", active: true },
    ],
  },
];

const availablePermits = [
  {
    name: "Ver estadisticas",
  },
  {
    name: "Administrar eventos",
  },
  {
    name: "Administrar usuarios",
  },
  {
    name: "Boton de panico",
  },
  {
    name: "Super usuario",
  },
];

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




export default function EditPermitUsers() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [userList, setUserList] = useState(users);

  const navigate = useNavigate();

  const handleSaveClick = () => {
    const updatedUserList = [...userList];
    const userIndex = updatedUserList.findIndex(
      (user) => user.email === selectedUser.email
    );
    updatedUserList[userIndex] = selectedUser;
    setUserList(updatedUserList);
    navigate('/admin-users');
  };


  const handleDisableAccount = () => {
    const updatedUser = { ...selectedUser };
    updatedUser.disabled = !updatedUser.disabled;
    setSelectedUser(updatedUser);

    const updatedUserList = [...userList];
    const userIndex = updatedUserList.findIndex(
      (user) => user.email === selectedUser.email
    );
    updatedUserList[userIndex] = updatedUser;
    setUserList(updatedUserList);

  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handlePermissionChange = (permitName) => {
    const updatedUser = { ...selectedUser };
    const permitIndex = updatedUser.permits.findIndex(
      (permit) => permit.name === permitName
    );
    updatedUser.permits[permitIndex].active = !updatedUser.permits[permitIndex]
      .active;
    setSelectedUser(updatedUser);
  };

  const handleAddPermission = (permitName) => {
    const updatedUser = { ...selectedUser };
    const permit = availablePermits.find((permit) => permit.name === permitName);
    if (permit) {
      updatedUser.permits.push({ name: permit.name, active: true });
      setSelectedUser(updatedUser);
    }
  };


  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    document.title = "Edit permits users";
  }, []);


  return (
    <div className={classes["generalContainer"]}>
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
      <div className={classes["bodyContainer"]}>
        <div className={classes["userPermitsContainer"]}>
          <div className={classes["userContainer"]}>
            {userList.map((user) => (
              <div
                key={user.email}
                className={`${classes["user"]} ${
                  user === selectedUser ? classes["userSelected"] : ""
                }`}
                onClick={() => handleUserSelect(user)}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.email}
                  className="w-auto h-auto "
                />
                <div className={classes["emailContainer"]}>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={classes["disablebuttonContainer"]}>
              <Button 
              onClick={handleDisableAccount}
              color="red">
                Deshabilitar cuenta
              </Button>
              </div>
          <div className={classes["listPermitsContainer"]}>
          <div className={classes["permitListContainer"]}>
              <div>
            {selectedUser.permits.map((permit) => (
              <div key={permit.name} className={[classes["checkboxContainer"]]}>
                
                <Typography className="ml-2 text-yellowCapas
                    PC-1920*1080:text-3xl
                    PC-1600*900:text-3xl
                    PC-1366*768:text-3xl
                    PC-1280*720:text-3xl
                    PC-1024*768:text-3xl
                    ">
                  {permit.name}:
                </Typography>
                <Typography className="ml-2
                    PC-1920*1080:text-3xl
                    PC-1600*900:text-3xl
                    PC-1366*768:text-3xl
                    PC-1280*720:text-3xl
                    PC-1024*768:text-3xl
                    ">
                  {permit.active ? "permitido" : "no permitido"}
                </Typography>
                <Checkbox
                  checked={permit.active}
                  onChange={() => handlePermissionChange(permit.name)}
                  color="blue"
                />
              </div>
            ))}
            
            {availablePermits.map((permit) => (
              <div key={permit.name} className={[classes["checkboxContainer2"]]} >
                {!selectedUser.permits.some(
                  (userPermit) => userPermit.name === permit.name
                ) && (
                    <div className={[classes["checkboxContainer3"]]} >
                    <Typography className="ml-2 text-yellowCapas
                    PC-1920*1080:text-3xl 
                    PC-1600*900:text-3xl
                    PC-1366*768:text-3xl
                    PC-1280*720:text-3xl
                    PC-1024*768:text-3xl
                    ">
                    {permit.name}:
                    </Typography>
                    <Typography className="ml-2
                    PC-1920*1080:text-3xl
                    PC-1600*900:text-3xl
                    PC-1366*768:text-3xl
                    PC-1280*720:text-3xl
                    PC-1024*768:text-3xl
                    ">
                    {permit.active ? "permitido" : "no permitido"}
                    </Typography>
                    <Checkbox
                      checked={false}
                      onChange={() => handleAddPermission(permit.name)}
                      color="blue"
                    />
                    </div>
                )}
              </div>
              
            ))}
            </div>  
        </div>
                    <div className={classes["buttonsContainer"]}>
            <div className={classes["buttonContainer"]}>
                <Button 
                onClick={handleCancelClick}
                className="mt-4 bg-black">
                    Cancelar
                </Button>
                <div className={classes["buttonContainer"]}>
                <Button 
                onClick={handleSaveClick}
                className="mt-4 bg-yellowCapas" >
                    Guardar cambios
                </Button>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}