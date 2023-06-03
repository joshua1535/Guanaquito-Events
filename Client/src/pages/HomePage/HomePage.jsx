import './HomePage.module.css';
import classes from './HomePage.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import React from "react";
import {
  Carousel,
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";


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

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };
 
  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-white lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
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

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
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
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white text-2xl"
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
    <Carousel className={[classes["carouselContainer"]]}>
        <div className={[classes["imgContainer"]]}>
          <img
            src="https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg"
            alt="image 1"
            className={[classes["imgCarouselFormat"]]} />
          <div className={[classes["imgBackgroundContainer"]]}>
            <div className={[classes["buttonContainer"]]}>
              <div className="flex gap-2">
                <button className={classes["buttonCarousel"]}>
                  Comprar tickets
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={[classes["imgContainer"]]}>
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className={[classes["imgCarouselFormat"]]} />
          <div className={[classes["imgBackgroundContainer"]]}>
            <div className={[classes["buttonContainer"]]}>
              <div className="flex gap-2">
                <button className={classes["buttonCarousel"]}>
                  Comprar tickets
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={[classes["imgContainer"]]}>
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className={[classes["imgCarouselFormat"]]} />
          <div className={[classes["imgBackgroundContainer"]]}>
            <div className={[classes["buttonContainer"]]}>
              <div className="flex gap-2">
                <button className={classes["buttonCarousel"]}>
                  Comprar tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <Carousel className={[classes["carouselContainer"]]}>
        <div className={[classes["imgContainer"]]}>
          <img
            src="https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg"
            alt="image 1"
            className={[classes["imgCarouselFormat"]]} />
          <div className={[classes["imgBackgroundContainer"]]}>
            <div className={[classes["buttonContainer"]]}>
              <div className="flex gap-2">
                <button className={classes["buttonCarousel"]}>
                  Comprar tickets
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={[classes["imgContainer"]]}>
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className={[classes["imgCarouselFormat"]]} />
          <div className={[classes["imgBackgroundContainer"]]}>
            <div className={[classes["buttonContainer"]]}>
              <div className="flex gap-2">
                <button className={classes["buttonCarousel"]}>
                  Comprar tickets
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={[classes["imgContainer"]]}>
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className={[classes["imgCarouselFormat"]]} />
          <div className={[classes["imgBackgroundContainer"]]}>
            <div className={[classes["buttonContainer"]]}>
              <div className="flex gap-2">
                <button className={classes["buttonCarousel"]}>
                  Comprar tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      </div>
      );
    }

/* export default function HomePage() {
  return (

    <Carousel className={[classes["carouselContainer"]]}>
   
      <div className={[classes["imgContainer"]]}>
        <img
          src="https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg"
          alt="image 1"
          className={[classes["imgCarouselFormat"]]}
        />
        <div className={[classes["imgBackgroundContainer"]]}>
          <div className={[classes["buttonContainer"]]}>
            <div className="flex gap-2">
            <button className={classes["buttonCarousel"]}>
                Comprar tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={[classes["imgContainer"]]}>
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className={[classes["imgCarouselFormat"]]}
        />
        <div className={[classes["imgBackgroundContainer"]]}>
        <div className={[classes["buttonContainer"]]}>
            <div className="flex gap-2">
            <button className={classes["buttonCarousel"]}>
                Comprar tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={[classes["imgContainer"]]}>
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className={[classes["imgCarouselFormat"]]}
        />
        <div className={[classes["imgBackgroundContainer"]]}>
        <div className={[classes["buttonContainer"]]}>
            <div className="flex gap-2">
            <button className={classes["buttonCarousel"]}>
                Comprar tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
 */