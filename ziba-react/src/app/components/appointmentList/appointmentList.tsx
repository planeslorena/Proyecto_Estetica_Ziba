import React from 'react';
import './appointmentList.css'
import { Card, Table } from 'react-bootstrap';

const list = [{
  id: 'a',
  firstname: 'Robin',
  lastname: 'Wieruch',
  year: 1988,
},
{
  id: 'b',
  firstname: 'Dave',
  lastname: 'Davidds',
  year: 1990,
},
{
  id: 'b',
  firstname: 'Dave',
  lastname: 'Davidds',
  year: 1990,
},
{
  id: 'b',
  firstname: 'Dave',
  lastname: 'Davidds',
  year: 1990,
},
{
  id: 'b',
  firstname: 'Dave',
  lastname: 'Davidds',
  year: 1990,
}];

export const AppointmentList = () => {
  return (
    <div id="div1" className='div1'>
      <div id="div2" className='div2'>
        {list.map((item: any) => {
          return (
            <Card id="div3" className='div3'>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{item.firstname}</Card.Title>
                <Card.Text>
                  {item.lastname}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  );
};