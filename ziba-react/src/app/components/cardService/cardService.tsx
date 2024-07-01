import { Card } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './cardService.css'
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { DescriptionModal } from "./descriptionModal";

interface data {
    speciality: string,
    service: string,
    day: string,
    hour: string,
}

type Schedule = {
    day: string; // ej., "Lunes", "Martes"
    times: string[]; // ej., ["09:00 AM", "10:00 AM", "11:00 AM"]
};

const schedules: Schedule[] = [
    { day: 'Monday', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Tuesday', times: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { day: 'Wednesday', times: ['09:00 AM', '10:00 AM'] },
    { day: 'Thursday', times: ['01:00 PM', '02:00 PM'] },
    { day: 'Friday', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Saturday', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
];



interface cardServiceProps {
    speciality: any,
}

export const CardService: React.FC<cardServiceProps> = ({ speciality }) => {
    const [selected, setSelected] = useState<string>();
    const [show, setShow] = useState<any>(false);
    const [value, setValue] = useState<any>(new Date());
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [format, setFormat] = useState<string>('');
    const { register, handleSubmit, formState: { errors, isValid }, control, watch } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log(data);
    }

    const handleClose = () => {
        setShow(false);
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const startDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    const endDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 2, tomorrow.getDate() + 1);

    const isDateDisabled = (date: Date): boolean => {
        const day = date.getDay();
        const isSunday = day === 0;
        return isSunday || date < now || date >= endDate;
    };

    useEffect(() => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        let formated = value.toLocaleDateString(undefined, options);
        setFormat(formated);
    }, [value])

    useEffect(() => {
        if (!Array.isArray(value)) {
            const selectedDay = value.toLocaleDateString('en-US', { weekday: 'long' });
            const schedule = schedules.find(s => s.day === selectedDay);
            if (schedule) {
                setAvailableTimes(schedule.times);
            } else {
                setAvailableTimes([]);
            }
        }
    }, [value]);

    return (
        <div className="d-flex  container-card-service-dos">
            <Card className="d-flex flex-row  container-card-service">
                <img src={`imagenes/services/${speciality.img}.jpg`} alt="" />
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-evenly form-service ">
                    <div>
                        <Card.Title className="title-primary d-flex justify-content-evenly align-items-center">
                            <p className="p-title p-service">{speciality.img.toUpperCase()}</p>
                            <p className="p-title">Prof.{speciality.prof}</p>                        
                        </Card.Title> 
                            <Card.Title className="d-flex justify-content-evenly title-secondary align-items-center">
                                <>
                                <select
                                    {...register('service', {
                                        required: 'Por favor elija un servicio'
                                    })}>
                                    <option value="" selected disabled hidden>Servicio</option>
                                    {speciality.services.map((service: any) => ( 
                                        <option value={service.id} onSelect={() => setSelected(`${service.name}`)}>{service.name}</option>
                                        ))}
                                </select>
                                <small>{errors.service?.message}</small>
                                <p onClick={() => setShow(true)} className="p-title">¿Que es?</p>
                                {speciality.services.map((service: any) => (
                                    selected == service.name ?              
                                        <DescriptionModal service={service.name} desc='lorem ipsum' show={show} handleClose={handleClose}></DescriptionModal> : null
                                ))} 
                               </> 
                            
                        </Card.Title> 
                    </div>
                    <Card.Body className="d-flex justify-content-around">
                        <div className="d-flex flex-column align-items-center">
                            <p>Reserve aquí su turno</p>
                            <Controller
                                name="day"
                                control={control}
                                rules={{ required: 'Por favor elija un día' }}
                                render={({ field }) => (
                                    <Calendar
                                        onChange={(date) => {
                                            setValue(date);
                                            const options: Intl.DateTimeFormatOptions = {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            };
                                            field.onChange(value.toLocaleDateString(undefined, options));
                                        }}
                                        value={value}
                                        minDetail='month'
                                        maxDetail="month"
                                        minDate={startDate}
                                        maxDate={endDate}
                                        tileDisabled={({ date }) => isDateDisabled(date)}
                                        view="month"
                                        prev2Label={null}
                                        next2Label={null}
                                        showNeighboringMonth={false}
                                        locale='es-419'
                                        defaultValue={tomorrow}
                                    />
                                )}
                            />
                            <small>{errors.day?.message}</small>
                        </div>
                        <div className="d-flex flex-column justify-content-evenly">
                            <div className="container-price-service">
                                <p className="p-input-service">Precio</p>
                                <input type="text" defaultValue={speciality.price} disabled className="input-precio inputs-service" />
                            </div>
                            <div className="container-day-service">
                                <p className="p-input-service">Día</p>
                                <input type="text" defaultValue={format} disabled className="inputs-service" />
                            </div>
                            <div className="container-hour-service">
                                <p className="p-input-service" >Hora</p>
                                <select className="container-option-hour inputs-service"
                                    {...register("hour", {
                                        required: "Por favor ingrese una hora",
                                    })}>
                                    {availableTimes.length > 0 ? (
                                        <>
                                            <option value="" selected disabled>Elija un horario</option>
                                            {availableTimes.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="" selected disabled>No hay horarios disponibles</option>
                                    )}
                                </select>
                                <small>{errors.hour?.message}</small>
                            </div>
                            <button type="submit" disabled={!isValid} className="button-reservar-service">Reservar</button>
                        </div>
                    </Card.Body>
                </form>
            </Card>

        </div>


    )
}
