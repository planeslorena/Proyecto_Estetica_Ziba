import { Card, CardBody } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './cardService.css'


export const CardService = () => {
    return (
      
            <Card className="conteiner-card-service" >
                <img src="" alt="" />
                <div>
                    <Card.Title className="title-primary d-flex justify-content-evenly align-items-center">
                        <p className="p-service">Cosmetología</p>
                        <p className="p-professional">Prof.Marisa Ruiz</p>

                    </Card.Title>



                    <Card.Title className="d-flex  justify-content-evenly title-secondary align-items-center">
                        <select name="Tratamientos" id="">
                            <option value="">Peeling</option>
                            <option>Tratamiento facial</option>
                        </select>
                        <p className="p-que-es">¿Que es?</p>
                        <p className="p-beneficios">Beneficios</p>
                    </Card.Title>

                </div>
                <Card.Body className="d-flex justify-content-evenly">
                    <div className="d-flex flex-column align-items-center">
                        <p>Reserve aquí su turno</p>
                        <Calendar>

                        </Calendar>
                    </div>
                    <div className="d-flex flex-column justify-content-evenly">
                        <div className="container-price-service">
                            <p className="p-input-service">Precio</p>
                            <input type="text" className="input-precio inputs-service" />
                        </div>
                        <div className="container-day-service">
                            <p className="p-input-service" >Día</p>

                          <input type="text" defaultValue="11/8/2024" disabled className="inputs-service"/>
                        </div>
                        <div className="container-hour-service">
                            <p className="p-input-service" >Hora</p>
                            <select className="container-option-hour inputs-service">
                                <option value="">11hs</option>
                                <option value="">12hs</option>
                            </select>
                        </div>
                        <button className="button-reservar-service">Reservar</button>
                    </div>

                </Card.Body>


            </Card>


      


    )
}
