import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';
import './cardProfessional.css';

export function CardProfessional() {
  const [index, setIndex] = useState(0);

  const imgs = ['cosmetologist', 'hairStylist', 'makeupArtist', 'mani-pedicurist', 'massagist', 'waxer'];

  const handleSelect = (selectedIndex:any) => {
    setIndex(selectedIndex);
  };
// acc = accumulator. es un array de indices de grupos que crea el groupIndex. ej: acc = [group0[card0,card1,card2], group1[card3,card4,card5], ...] 
  const reduceItems = (acc:any, cur:any, index:any) => {
    const groupIndex = Math.floor(index / 3);
    //si no hay grupo, lo inicializa vacio
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  return (
    <main className='carousel-background'>
    <h3 className='title-carousel'>Profesionales y servicios</h3>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {imgs.reduce(reduceItems, []).map((item: any, index: any) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center cards-carousel">
              {item.map((item:any, index:any) => {
                return (
                  <div className='card-container'>
                  <Card key={index} className='card-content' style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={`imagenes/professionals/${item}.jpg`} />
                    <Card.Body>
                      <Card.Title>{item}</Card.Title>
                    </Card.Body>
                  </Card>
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
   </main>   
  );
 } 