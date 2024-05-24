import React from 'react';
import './appointmentList.css'
import { Card } from 'react-bootstrap';

const list = [ {
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
  } ];

export const AppointmentList = () => {


      return(
          <div >
            {list.map((item:any) =>{
                return (
            <div className='list-container'>
                
                <Card className='card-content' style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title className='title-card'>{item.firstname}</Card.Title>
                        <Card.Text className='title-text'>{item.lastname}</Card.Text>

                      </Card.Body>
                    </Card>
            </div>
)
              })}
          </div>
       
      );
   

    };