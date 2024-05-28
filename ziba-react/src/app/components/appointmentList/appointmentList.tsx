import React from 'react';
import './appointmentList.css'
import { Card } from 'react-bootstrap';

const list = [{
  profesion: 'depiladora',
  nombre: 'Romina Benegas',
  servicio: 'Depilación brasileña',
  dia: '27/05/2024',
  horario: '14:00',
},
{
  profesion: 'cosmetóloga',
  nombre: 'Marisa Ruiz',
  servicio: 'Peeling',
  dia: '27/05/2024',
  horario: '15:00',
},
{
  profesion: 'cosmetóloga',
  nombre: 'Marisa Ruiz',
  servicio: 'Limpieza Facial',
  dia: '27/05/2024',
  horario: '16:00',
},
{
  profesion: 'masajista',
  nombre: 'Naomi Almeida',
  servicio: 'Masaje cuerpo entero',
  dia: '27/05/2024',
  horario: '17:00',
},
{
  profesion: 'manicura',
  nombre: 'Maiten Suarez',
  servicio: 'Esculpidas',
  dia: '27/05/2024',
  horario: '18:00',
}];

export const AppointmentList = () => {
  return (
    <div className='appointment-list-container'>
      <div className='scroller-container'>
        <h4 className='scroller-title'>MIS TURNOS</h4>
        {list.map((item: any, index: any) => {
          return (
            <div key={index} className='appointment-cards-container'>
            <Card className='appointment-cards'>
              <div className='card-container'>
              <img className='img-appointment-card' src={`imagenes/professionals/${item.profesion}.png`} />
              <Card.Body>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Text>
                  Servicio: {item.servicio}
                </Card.Text>
                <div className='card-container'>
                <Card.Text>
                  Día: {item.dia}
                </Card.Text>
                <Card.Text>
                  Hora: {item.horario}
                </Card.Text>
                </div>
              </Card.Body>
              </div>
            </Card>
            </div>
          )
        })}
      </div>
    </div>
  );
};