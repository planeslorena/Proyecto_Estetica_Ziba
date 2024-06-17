import { useEffect, useState } from 'react';
import './professional.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getAllSpecialties } from '@/app/services/Services';


interface data {
    name: string;
    lastname: string;
    dni: number;
    phone: number;
    email: string;
    speciality: string;
    hour1: string;
    hour2: string;
}

const schedules = [
    { day: 'Lunes', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Martes', times: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { day: 'Miercoles', times: ['09:00 AM', '10:00 AM'] },
    { day: 'Jueves', times: ['01:00 PM', '02:00 PM'] },
    { day: 'Viernes', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Sábado', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
];

interface professionalProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
}

export const AddProfessional: React.FC<professionalProps> = ({ show, handleClose, data }) => {

    const [specialities, setSpecialities] = useState();
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const { handleSubmit, register, formState: { errors, isValid }, watch } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log();
    }

    const loadSpecialties = async () => {
        const resp = await getAllSpecialties();
        setSpecialities(resp);
    }
    
    let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
    const handleCheckboxChange = (day: string) => {
        const index = selectedDays.indexOf(day);
        if (index === -1) {
            setSelectedDays([...selectedDays, day]);
        } else {
            setSelectedDays(selectedDays.filter(d => d !== day));
        }
    };

    const watchHour1 = watch('hour1', '');
    const watchHour2 = watch('hour2', '');
    const validateTimeOrder = () => {
        if (watchHour1 && watchHour2) {
            return watchHour1 < watchHour2 || 'La primera hora debe ser anterior a la segunda';
        }
        return true;
    };

    useEffect(() => {
        let times: string[] = [];
        selectedDays.forEach(day => {
            const schedule = schedules.find(s => s.day === day);
            if (schedule) {
                times = [...times, ...schedule.times];
            }
        });
        setAvailableTimes(times);
    }, [selectedDays]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Agregar profesional</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className='form-label-admin'>Nombre</label>
                            <input className='form-input-admin'
                                {...register("name", {
                                    required: "Por favor ingrese un nombre",
                                    minLength: {
                                        value: 2,
                                        message: "El nombre no puede contener menos de 2 caracteres",

                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El nombre no puede contener más de 100 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Nombre inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.name?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Apellido</label>
                            <input className='form-input-admin'
                                {...register("lastname", {
                                    required: "Por favor ingrese un apellido",
                                    minLength: {
                                        value: 2,
                                        message: "El apellido no puede contener menos de 2 caracteres",

                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El apellido no puede contener más de 100 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Apellido inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.lastname?.message}</small>
                        </div>
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
                            <label className='form-label-admin'>Teléfono celular</label>
                            <input className='form-input-admin'
                                {...register("phone",
                                    {
                                        required: "Por favor ingrese su nombre de teléfono",
                                        minLength: {
                                            value: 10,
                                            message: "El número de teléfono no puede tener menos de 10 caracteres",

                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "El número de teléfono no puede tener más de 10 caracteres",
                                        },
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                            message: "Número de teléfono inválido",
                                        }

                                    })} />
                            <small className='texto-validaciones'>{errors.phone?.message}</small>
                        </div>

                        <div>
                            <label className='form-label-admin'>Email</label>
                            <input className='form-input-admin'
                                placeholder="Ingrese su email"
                                {...register("email", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Dirección de email invalida'
                                    },
                                })} />
                            <small className='text-validation-register'>{errors.email?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Especialidad</label>
                            
                            <select className="form-select form-input-admin" aria-label="Default select example" {...register(
                                "speciality")} onClick= {() =>loadSpecialties()}>
                                <option value="si">Masajes</option>
                                <option value="no">Peluqueria</option> </select>
                        </div>
                        <div>
                            <label className='form-label-admin'>Día/s</label>
                            {days.map(day => (
                                <label key={day}>
                                    <input
                                        type='checkbox'
                                        onChange={() => handleCheckboxChange(day)}
                                        checked={selectedDays.includes(day)}
                                    />
                                    <span>{day}</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Horarios</label>
                            <input type="time" id="appt" name="appt" list="time-list"/>
                            <datalist id="time-list" >
                                    <option id="08" value="08:30" datatype="time"/>
                                    <option id="09" value="09:30" datatype="time" />
                                    <option id="10" value="10:30" datatype="time"/>
                                    <option id="11" value="11:30" datatype="time" />
                                    <option id="13" value="13:30" datatype="time" />
                                    <option id="20" value="20:30" datatype="time"/>
                                </datalist>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("hour1", {
                                    required: "Por favor ingrese una hora",
                                })}>
                                {availableTimes.map((time, index) => (
                                    <option key={index}>{time}</option>
                                ))}
                            </select>
                            <span>-</span>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                {...register("hour2", {
                                    required: "Por favor ingrese una hora",
                                    validate: validateTimeOrder,
                                })}>
                                {availableTimes.map((time, index) => (
                                    <option key={index}>{time}</option>
                                ))}
                            </select>

                            <small className='texto-validaciones'>{errors.hour2?.message}</small>
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>Agregar Profesional</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




