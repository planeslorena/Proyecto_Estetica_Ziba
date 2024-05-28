// pages/index.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

const Home = () => {
  const [filter, setFilter] = useState('day');
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchDates = () => {
      const now = new Date();
      let dateArray = [];
      
      switch (filter) {
        case 'day':
          dateArray = [now];
          break;
        case 'week':
          for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            dateArray.push(date);
          }
          break;
        case 'month':
          for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            dateArray.push(date);
          }
          break;
        case 'year':
          for (let i = 0; i < 365; i++) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            dateArray.push(date);
          }
          break;
        default:
          dateArray = [now];
      }

      setDates(dateArray);
    };

    fetchDates();
  }, [filter]);

  const handleSelect = (e:any) => {
    setFilter(e);
  };

  return (
    <Container>
      <h1>Filtrar por:</h1>
      <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="day">Día</Dropdown.Item>
        <Dropdown.Item eventKey="week">Semana</Dropdown.Item>
        <Dropdown.Item eventKey="month">Mes</Dropdown.Item>
        <Dropdown.Item eventKey="year">Año</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <Row>
        {dates.map((date, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
