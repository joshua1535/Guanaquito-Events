import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import classes from "../pages/HomePage/HomePage.module.css";

const cardData = [
  { id: 1, title: 'CINE', imageUrl: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/03/palomitas-sala-cine-2992264.jpg?tf=3840x' },
  { id: 2, title: 'CONCIERTO', imageUrl: 'https://thumbs.dreamstime.com/b/muchedumbre-del-concierto-10447765.jpg' },
  { id: 3, title: 'TEATRO', imageUrl: 'https://www.hoyesarte.com/wp-content/uploads/2009/08/teatro-2.jpg' },
  { id: 4, title: 'DEPORTES', imageUrl: 'https://i.ytimg.com/vi/uGU1IztR5rg/maxresdefault.jpg' },
  // Agrega más tarjetas si es necesario
];

export default function SliderCards()  {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true, // Habilita el centro del modo
      centerPadding: '25%', // Ajusta el espacio para mostrar una porción de la siguiente tarjeta (25% en este caso)
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false,
            swipe: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            arrows: false,
            swipe: true,
            centerPadding: '20%', // Ajusta el espacio en dispositivos móviles
          },
        },
      ],
    };
    const navigate = useNavigate();
  
    const viewEventsHandler = () => {
      navigate("/events");
    };
    
  
    return (
      <div className={[classes["sliderMobileContainer"]]}>
  
        <Slider {...settings}>
          {cardData.map((card) => (
            <div key={card.id} className="p-4">
              <div className="relative bg-white rounded shadow h-64 border-2 border-gray-300">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                  <h2 className="text-lg font-bold">{card.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button 
        onClick={viewEventsHandler}
        className={classes["viewMoreButtonMobile"]}>Ver todos</button>
      </div>
    );
  };