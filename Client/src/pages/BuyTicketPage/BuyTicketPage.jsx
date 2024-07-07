import React, { useState, useEffect } from "react";
import "./BuyTicketPage.module.css";
import logo from "../../assets/logo.png";
import classes from "./BuyTicketPage.module.css";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars2Icon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useUserContext } from "../../Context/userContext";
import { eventService } from "../../Services/eventService";
import { tierService } from "../../Services/tierService";
import { orderService } from "../../Services/orderService";
import { ticketService } from "../../Services/ticketService";

import { Toaster, toast } from "sonner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { or } from "fp-ts/lib/Predicate";
import Footer from '../../Components/Footer';
import Header from "../../Components/Header/Header";

const DropBoxContainer = ({ tier, onSelectTier }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleDecrease = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  useEffect(() => {
    onSelectTier(tier, selectedQuantity);
  }, [selectedQuantity, tier]);

  return (
    <div className={[classes["dropboxContainer"]]}>
      <button
        className="mr-4 text-white font-bold bg-red-500 rounded-full w-8 h-8 mt-auto
      PC-800*600:w-5 PC-800*600:h-5 PC-800*600:mr-2
      PC-640*480:w-6 PC-640*480:h-6 PC-640*480:mr-2
      Mobile-390*844:w-7 Mobile-390*844:h-7
      Mobile-280:w-6 Mobile-280:h-6
      "
        onClick={handleDecrease}
      >
        -
      </button>
      <span className="text-white font-bold w-auto h-auto mt-auto mb-auto">
        {selectedQuantity}
      </span>
      <button
        className="ml-4 text-white font-bold bg-green-500 rounded-full w-8 h-8
      PC-800*600:w-5 PC-800*600:h-5 PC-800*600:ml-2
      PC-640*480:w-5 PC-640*480:h-5 PC-640*480:ml-2
      Mobile-390*844:w-7 Mobile-390*844:h-7
      Mobile-280:w-6 Mobile-280:h-6
      "
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

const BuyTicket = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [activeButton, setActiveButton] = useState(1);
  const { user, token } = useUserContext();
  const { code } = useParams(); // Obtiene el código de la URL
  const [event, setEvent] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [moreLowTier, setMoreLowTier] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [tiersToBuy, setTiersToBuy] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // Nuevo estado para mostrar el video
  const [finalTiers, setFinalTiers] = useState([]);
  const [eventCapacity, setEventCapacity] = useState(0);
  const [eventRemainingCapacity, setEventRemainingCapacity] = useState(0);

  const handleSelectTier = (tier, quantity) => {
    setTiersToBuy((prevTiers) => {
      const existingTier = prevTiers.find((t) => t.name === tier.name);
      if (quantity > 0) {
        if (existingTier) {
          // Si el tier ya existe en la lista, se actualiza la cantidad
          return prevTiers.map((t) =>
            t.name === tier.name ? { ...t, quantity } : t
          );
        } else {
          // Si el tier no existe en la lista, se agrega
          return [...prevTiers, { id: tier.code, name: tier.name, quantity }];
        }
      } else {
        // Si la cantidad es 0, se elimina el tier de la lista
        return prevTiers.filter((t) => t.name !== tier.name);
      }
    });
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    setShowDetails(true);
    setShowVideo(false); // Asegurarse de que el video no se muestre
  };

  const handleButtonClick2 = () => {
    setShowDetails(false);
    setShowVideo(false); // Asegurarse de que el video no se muestre
  };

  const handleButtonClick3 = () => {
    setShowVideo(true);
    setShowDetails(false); // Asegurarse de que los detalles no se muestren
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (token) {
      eventService.getEventById(code, token).then((event) => setEvent(event));

      tierService
        .getTiersbyEvent(code, token)
        .then((tiers) => setTiers(tiers.tiers));

      tierService
        .getTiersbyEvent(code, token)
        .then((tiers) => setEventCapacity(tiers.eventCapacity));

      tierService
        .getTiersbyEvent(code, token)
        .then((tiers) =>
          setEventRemainingCapacity(tiers.eventRemainingCapacity)
        );
    }
  }, [token, code]);

  useEffect(() => {
    if (tiers.length > 0) {
      //Setear el tier con el precio mas bajo
      const moreLowTier = tiers.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      );
      setMoreLowTier(moreLowTier);
    }
  }, [moreLowTier, tiers]);

  useEffect(() => {
    console.log(tiersToBuy);
  }, [selectedTiers, selectedQuantity, tiersToBuy]);

  const handleBuyTicket = async () => {
    if (tiersToBuy.length > 0 && token) {
      // Obtener fecha actual en formato YYYY-MM-DD
      const date = new Date();
      const currentDate = date.toISOString().split("T")[0];

      try {
        // Crear la orden
        const order = await orderService.createOrder(token, currentDate);
        setOrderId(order);

        // Crear los tickets
        const finalTiers = tiersToBuy.flatMap((tier) =>
          Array.from({ length: tier.quantity }, () => ({
            order: order,
            tier: tier.id,
          }))
        );

        // Enviar la solicitud POST para comprar los tickets
        const orderResponse = await ticketService.createTicket(
          finalTiers,
          token
        );

        if (orderResponse) {
          toast.success("Tickets comprados exitosamente", {
            duration: 5000,
            icon: <CheckCircleIcon style={{ color: "green" }} />,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error comprando los tickets:", error);

        toast.error("Error comprando los tickets", {
          duration: 5000,
          icon: <XCircleIcon style={{ color: "red" }} />,
          position: "top-right",
        });
      }
    }
  };

  useEffect(() => {
    console.log(eventCapacity);
    console.log(eventRemainingCapacity);
  }, [eventCapacity, eventRemainingCapacity]);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-between min-h-screen">
        <Header darkMode={true} />
        <div className={[classes["generalContainer"]]}>
          <div className="flex w-3/4 h-full overflow-auto">
            <div className="flex flex-col h-full overflow-hidden">
              <img
                className={[classes["imgContainer"]]}
                src={event?.image}
                alt="Event"
              />
              <Typography
                className={[classes["titleContainer"]]}
                color="white"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {event?.title}
              </Typography>
              <Typography
                className={[classes["capacityContainer"]]}
                color="white"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {eventRemainingCapacity} boletos disponibles
              </Typography>
            </div>
            <div className={[classes["infoContainer"]]}>
              <div className={[classes["topbuttonsContainer"]]}>
                <button
                  onClick={handleButtonClick2}
                  className={`PC
                    PC-800*600:text-base PC-1280*720:text-xl PC-800*600:w-1/2
                    PC-640*480:text-xs PC-640*480:w-1/2  
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${
                      showDetails === false
                        ? "bg-Orange text-blue-900"
                        : "bg-dark-blue text-white hover:bg-orange-600"
                    }`}
                  style={{ fontFamily: "Poppins" }}
                >
                  COMPRAR
                </button>
                <button
                  onClick={handleButtonClick}
                  className={`
                    PC-1280*720:text-base PC-800*600:text-sm  PC-800*600:w-1/2
                    PC-640*480:text-sm PC-640*480:w-1/2  PC-640*480:text-center 
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${
                      showDetails === true
                        ? "bg-Orange text-blue-900 "
                        : "bg-dark-blue text-white hover:bg-orange-600"
                    }
                      text-blue-900 `}
                  style={{ fontFamily: "Poppins" }}
                >
                  DETALLES DEL EVENTO
                </button>
                <button
                  onClick={handleButtonClick3}
                  className={`
                    PC-1280*720:text-base PC-800*600:text-sm  PC-800*600:w-1/2
                    PC-640*480:text-sm PC-640*480:w-1/2  PC-640*480:text-center 
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${
                      showVideo === true
                        ? "bg-Orange text-blue-900 "
                        : "bg-dark-blue text-white hover:bg-orange-600"
                    }
                      text-blue-900 `}
                  style={{ fontFamily: "Poppins" }}
                >
                  VIDEO
                </button>
              </div>

              {showDetails && (
                <div className="mt-4">
                  <h1 className={[classes["titleH1"]]}>{event?.title}</h1>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Fecha: </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.date}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Hora: </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.time}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>
                      Participantes:{" "}
                    </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.involvedPeople}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>
                      Patrocinadores:{" "}
                    </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.sponsors}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Categoría: </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.category.name}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Capacidad: </span>
                    <span className={[classes["contentSpan"]]}>
                      {eventCapacity} entradas
                    </span>
                  </p>
                </div>
              )}

              {showVideo && event?.demo && (
                <div className="mt-4">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${event.demo}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {!showDetails && !showVideo && (
                <>
                  <div className="grid grid-cols-2">
                    {tiers.map((tier) => (
                      <div
                        className=" 
                          PC-1280*720:ml-3 PC-1280*720:mt-3
                          PC-800*600:ml-3 PC-800*600:mt-2  
                          PC-640*480:ml-1 PC-640*480:mt-2
                          flex items-center w-fit text-Orange ml-14 mt-7"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <div>
                          <h2 className={[classes["ticketText"]]}>
                            {tier?.name}
                          </h2>
                          <p className={[classes["ticketPrice2"]]}>
                            Precio:{" "}
                            <span className={[classes["ticketPrice"]]}>
                              ${tier.price}
                            </span>
                          </p>
                        </div>
                        <div className="PC-640*480:ml-1 ml-3">
                          <DropBoxContainer
                            tier={tier}
                            onSelectTier={handleSelectTier}
                          />
                          <p className={[classes["ticketPrice2"]]}>
                            restantes: {tier.remainingCapacity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className={[classes["botbuttonsContainer"]]}>
                <button
                  onClick={handleBuyTicket}
                  className=" 
                    PC-1280*720:w-32 C-1280*720:h-12 
                    PC-800*600:w-24 PC-800*600:h-10 
                    PC-640*480:w-20 PC-640*480:h-7 
                    bg-Orange   h-14 w-44 rounded-full text-white hover:bg-orange-600"
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden flex flex-col items-center h-72 w-full bg-cover ">
          <div className="flex flex-col items-center  text-white rounded">
            <img
              className=" w-full h-full object-cover mb-6 opacity-20 shadow-xl"
              src={event?.image}
              alt="Event"
            />
            <img
              className=" w-5/6 h-full object-cover mb-6 -mt-32 shadow-xl"
              src={event?.image}
              alt="Event"
            />
          </div>

          <h1
            className="text-white  text-center text-2xl mt-8"
            style={{ fontFamily: "PoppinsSemiBold" }}
          >
            {event?.title}
          </h1>

          <div className="flex flex-col items-center text-white p-4 rounded mt-4">
            <p className="text-base">
              <span className="ml-2" style={{ fontFamily: "PoppinsLight" }}>
                {" "}
                Categoría:{" "}
              </span>
              <span
                className="font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {event?.category.name}{" "}
              </span>
            </p>
            <p className="text-base">
              <span className="ml-2" style={{ fontFamily: "PoppinsLight" }}>
                {" "}
                Fecha:{" "}
              </span>
              <span
                className="font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {" " + event?.date}{" "}
              </span>
            </p>
            <p className="text-base">
              <span className="ml-2" style={{ fontFamily: "PoppinsLight" }}>
                {" "}
                Hora:{" "}
              </span>
              <span
                className=" font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {" " + event?.time}
              </span>
            </p>
            <p className="flex pt-2 text-3xl font-bold mt-8">
              <span
                className=" text-2xl mr-2 font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                Entradas desde:{" "}
              </span>
              <span
                className="text-3xl text-Orange font-bold"
                style={{ fontFamily: "PoppinsBold" }}
              >
                ${moreLowTier?.price}
              </span>
            </p>
            <div className="grid grid-cols-1 border-2 border-Orange mb-4">
              {tiers.map((tier) => (
                <div
                  className=" 
                    flex items-center w-fit text-Orange mx-4 my-7"
                  style={{ fontFamily: "Poppins" }}
                >
                  <div>
                    <h2 className={[classes["ticketText"]]}>{tier?.name}</h2>
                    <p className={[classes["ticketPrice2"]]}>
                      Precio:{" "}
                      <span className={[classes["ticketPrice"]]}>
                        ${tier.price}
                      </span>
                    </p>
                  </div>
                  <div className="PC-640*480:ml-1 ml-3">
                    <DropBoxContainer
                      tier={tier}
                      onSelectTier={handleSelectTier}
                    />
                    <p className={[classes["ticketPrice2"]]}>
                      restantes: {tier.remainingCapacity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="bg-Orange h-14 w-full  rounded-full text-white text-xl"
              onClick={handleBuyTicket}
              style={{ fontFamily: "Poppins" }}
            >
              Comprar tickets
            </button>
          </div>
        </div>
        <Footer additionalClasses="hidden sm:block" />
      </div>
    </>
  );
};

export default BuyTicket;