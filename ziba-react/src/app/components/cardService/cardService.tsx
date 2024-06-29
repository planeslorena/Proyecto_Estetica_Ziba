import { Card } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './cardService.css'
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

interface data {
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

const speciality = [
    { img: 'cosmetologia', prof: 'Marisa Ruiz', price: '10000', services: ['Peeling', 'Limpieza facial'] },
    { img: 'depilacion', prof: 'Romina Benegas', price: '10000', services: ['Bozo', 'Piernas'] },
    { img: 'manicuria', prof: 'Maiten Suarez', price: '10000', services: ['Soft gel', 'Semipermanente'] },
    { img: 'maquillaje', prof: 'Eva Jimenez', price: '10000', services: ['Novias', 'Quinceañeras'] },
    { img: 'masoterapia', prof: 'Naomi Almeida', price: '10000', services: ['Masaje terapéutico', 'Masaje lifático'] },
    { img: 'peluqueria', prof: 'Irene Acosta', price: '10000', services: ['Corte', 'Nutrición'] },
]

export const CardService = () => {
    const [value, setValue] = useState<any>(new Date());
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [format, setFormat] = useState<string>('');
    const { register, handleSubmit, formState: { errors, isValid }, control } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log(data);
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
        <div /* className="d-flex flex-column align-items-evenly" */>
            {speciality.map((speciality) => (
                <Card className="d-flex flex-row conteiner-card-service">
                    <img src={`imagenes/services/${speciality.img}.jpg`} alt="" />
                    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-evenly">
                        <div>
                            <Card.Title className="title-primary d-flex justify-content-evenly align-items-center">
                                <p className="p-title p-service">{speciality.img.toUpperCase()}</p>
                                <p className="p-title">Prof.{speciality.prof}</p>
                            </Card.Title>
                            <Card.Title className="d-flex justify-content-evenly title-secondary align-items-center">
                                <select
                                    {...register('service')}>
                                    <option value="" selected disabled hidden>Servicio</option>
                                    {speciality.services.map((service) => (
                                        <option value={service}>{service}</option>
                                    ))}
                                </select>
                                <p className="p-title">¿Que es?</p>
                            </Card.Title>
                        </div>
                        <div className="d-flex">
                            <Card.Body className="d-flex justify-content-evenly">
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
                                                availableTimes.map((time, index) => (
                                                    <option key={index} value={time}>
                                                        {time}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>No hay horarios disponibles</option>
                                            )}
                                        </select>
                                        <small>{errors.hour?.message}</small>
                                    </div>
                                    <button type="submit" disabled={!isValid} className="button-reservar-service">Reservar</button>
                                </div>
                            </Card.Body>
                        </div>
                    </form>
                </Card>
            ))}
        </div>


    )
}
