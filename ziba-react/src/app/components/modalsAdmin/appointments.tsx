import { useEffect, useState } from 'react';
import './appointments.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface data {
    dni: number,
    speciality: string,
    service: string,
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

interface appointmentsProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
}

export const AddAppoinments: React.FC<appointmentsProps> = ({ show, handleClose, data }) => {

    const [value, setValue] = useState<any>(new Date());
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const { handleSubmit, register, formState: { errors, isValid } } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log(data);
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const startDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    const endDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 2, tomorrow.getDate() + 1);

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const isDateDisabled = (date: Date): boolean => {
        const day = date.getDay();
        const isSunday = day === 0;
        return isSunday || date < tomorrow || date > endDate;
    };

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
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar turno</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className='form-label-admin'>Dni</label>
                            <input className='form-input-admin'
                                {
                                ...register("dni", {
                                    required: "Por favor ingrese su dni",
                                    validate: (value: number) => {
                                        if (value < 1000000 || value > 100000000) {
                                            return "Debe ingresar un dni válido";
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: "Dni inválido",
                                    }



                                })} />
                            <small className='texto-validaciones'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Especialidad</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("speciality", {
                                    required: "Por favor ingrese una especialidad",
                                })}>
                                <option>Masajes</option>
                                <option>Peluqueria</option>
                                <option>Manicura</option>
                                <option>Depilación</option>
                            </select>

                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Servicio</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("service", {
                                    required: "Por favor ingrese un servicio",
                                })}>
                                <option>Bozo</option>
                                <option>Peeling</option>
                                <option>Soft gel</option>
                                <option>Piedras calientes</option>
                            </select>

                            <small className='texto-validaciones'>{errors.service?.message}</small>
                        </div>
                        <div>
                            <label>Día</label>
                            <Calendar
                                onChange={setValue}
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
                            />
                            <p>
                                Turno: {formatDate(value)}
                            </p>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Hora</label>
                            <select>
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
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>Agregar turno</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




