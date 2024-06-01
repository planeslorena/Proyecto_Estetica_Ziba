import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';
import './cardProfessional.css';

export function CardProfessional() {
  const [index, setIndex] = useState(0);

  const imgs =
    [{ profesion: 'cosmetología', nombre: 'Marisa Ruiz', descripcion: ["Limpieza facial", "Peeling facial","Drenaje linfático","Peeling corporal", "Tratamiento para celulitis", "Drenaje linfático corporal"]},
    { profesion: 'peluquería', nombre: 'Irene Acosta',descripcion: ["Corte", "Nutrición","Keratina","Peinados","Tinte","Balayage"]},
    { profesion: 'maquillaje', nombre: 'Eva Gimenez',descripcion: ["Novias","Quinceañeras","Social","Modelaje","Artitistico infantil","Artistico teatral"]},
    { profesion: 'manicuría', nombre: 'Maiten Suarez', descripcion: ["Spa de manos","Semipermanente","Soft gel","Nail art","Caping"]},
    { profesion: 'masoterapia', nombre: 'Naomi Almeida',descripcion: ["Masaje terapéutico","Masaje circulatorio","Masaje deportivo","Masaje descontracturante","Masaje lifático"] },
    { profesion: 'depilación', nombre: 'Romina Benegas', descripcion: ["Depilación láser"]},


  ];

 

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  // acc = accumulator. es un array de indices de grupos que crea el groupIndex. ej: acc = [group0[card0,card1,card2], group1[card3,card4,card5], ...] 
  const reduceItems = (acc: any, cur: any, index: any) => {
    const groupIndex = Math.floor(index / 3);
    //si no hay grupo, lo inicializa vacio
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
 
    return acc;
  };

  return (

    <main className='carousel-background'>




      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {imgs.reduce(reduceItems, []).map((item: any, index: any) => (
          <Carousel.Item key={index}>
            <div key={index} className="d-flex justify-content-center cards-carousel">
              {item.map((item: any, index: any) => {
                return (
                  <div key={index} className='card-container'>
                    <Card key={index} className='card-content' style={{ width: "18rem" }}>

                      <Card.Body key={index} >
                        <Card.Title key={"title"+ item.profesion} className='title-card' >{item.profesion}</Card.Title>
                        <Card.Text key={"text"+item.profesion} className='title-text'>{item.nombre}</Card.Text>
                        <Card.Img key={"img"+item.profesion}  className="img-carousel" variant="top" src={`imagenes/professionals/${item.profesion}.png`} />
                        <div key={"square"+item.profesion} className='square-carousel' > 
                        {item.descripcion.map((service: any) => {
                        return ( 
                         <li key={item.descripcion+service}> {service}</li>


                        )})}
                        
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>

          </Carousel.Item>


        ))}


      </Carousel>


      <div className='container-button-reservation'>
        <button className='button-reservation'>Reserve aquí su turno</button>
      </div>
    </main>
  );
} 