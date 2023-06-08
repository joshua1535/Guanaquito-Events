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
import classes from "./AdminUsers.module.css";
import {
    ChevronDownIcon,
    Bars2Icon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";


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
            {navListItems.map(({ label }, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
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

  return (
    <Typography
      {...triggers}
      as="a"
      href="#"
      color="white"
      className="font-normal"
    >
    </Typography>
  );
}

export default function AdminUsers() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(usersStaff);
    const [selectedUser, setSelectedUser] = useState("");
    const [userList, setUserList] = useState([]);
    const [usersInEvent, setUsersInEvent] = useState(usersInEventDefault);
  
    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);
  
    useEffect(() => {
      document.title = "Admin Users";
    }, []);
  
    const handleAddUser = () => {
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
      <h1 className={[classes["title"]]}>Administrar usuarios</h1>
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
          <Button onClick={handleAddUser} className="w-32 bg-green-500 Mobile-280:w-fit"> Agregar </Button>  
            </div>
          <div className={classes["usersInEventContainer"]}>
            {usersInEvent.map((user) => (
                <div key={user.email} className={classes["userInEvent"]}>
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    className="w-auto h-auto "
                />
                <div className={[classes["emailContainer"]]}>
                <p>{user.email}</p>
                <div className={[classes["buttonContainer"]]}>
                <button className={[classes["editPermitsButton"]]}>
                Editar permisos
                </button>

                </div>
              </div>
                </div>
            ))}
          </div>
    </div>
    </div>
    </div>
  );
}