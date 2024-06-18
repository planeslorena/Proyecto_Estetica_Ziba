import { useEffect, useState } from 'react';
import './professional.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getSpecialtiesWhitoutProf } from '@/app/services/Services';
import { createProf } from '@/app/services/User';
import Swal from 'sweetalert2';


interface data {
    id: number,
    name: string,
    lastname: string,
    dni: number,
    tel: number,
    email: string,
    speciality: string,
    hour1: string,
    hour2: string,
}

const schedules = [
    { day: 'Lunes', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Martes', times: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { day: 'Miercoles', times: ['09:00 AM', '10:00 AM'] },
    { day: 'Jueves', times: ['01:00 PM', '02:00 PM'] },
    { day: 'Viernes', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { day: 'Sábado', times: ['09:00 AM', '10:00 AM', '11:00 AM'] },
];

const open = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'];

interface professionalProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
}

export const AddProfessional: React.FC<professionalProps> = ({ show, handleClose, data }) => {

    const [specialties, setSpecialties] = useState([{id:'',speciality:''}]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [checkedLunes, setCheckedLunes] = useState<boolean>(false);
    const [checkedMartes, setCheckedMartes] = useState<boolean>(false);
    const [checkedMiercoles, setCheckedMiercoles] = useState<boolean>(false);
    const [checkedJueves, setCheckedJueves] = useState<boolean>(false);
    const [checkedViernes, setCheckedViernes] = useState<boolean>(false);
    const [checkedSábado, setCheckedSábado] = useState<boolean>(false);
    const { handleSubmit, register, formState: { errors, isValid }, watch } = useForm<data>();
    const onSubmit: SubmitHandler<data> = async (data) => {
        const prof = {
            mail: data.email,
            password: 'prof1234',
            name: data.name,
            lastname:data.lastname,
            dni: data.dni,
            phone: data.tel,
            role: 'prof',
            speciality: data.speciality,
            hour_begin: data.hour1,
            hour_end: data.hour2
        }
        const resp = await createProf(prof);

        if (resp == 409) {
           setErrorRegister('El mail indicado ya se encuentra registrado.')
        } else {
            Swal.fire({
            title: `Agregar Profesional`,
            text: "Profesional registrado con exito!",
            icon: "success"
            });
            handleClose();
        } 
    }

    const loadSpecialties = async () => {
        const resp = await getSpecialtiesWhitoutProf();
        setSpecialties(resp);
    }
    
    let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
    const handleCheckboxChange = (day: string) => {
        const index = selectedDays.indexOf(day);
        if (index === -1) {
            setSelectedDays([...selectedDays, day]);
            switch (day) {
                case 'Lunes':
                    setCheckedLunes(true);
                    break;
                    case 'Martes':
                    setCheckedMartes(true);
                    break;
                    case 'Miercoles':
                    setCheckedMiercoles(true);
                    break;
                    case 'Jueves':
                    setCheckedJueves(true);
                    break;
                    case 'Viernes':
                    setCheckedViernes(true);
                    break;
                    case 'Sábado':
                    setCheckedSábado(true);
                    break;
                default:
                    break;
            }
        } else {
            setSelectedDays(selectedDays.filter(d => d !== day));
            switch (day) {
                case 'Lunes':
                    setCheckedLunes(false);
                    break;
                    case 'Martes':
                    setCheckedMartes(false);
                    break;
                    case 'Miercoles':
                    setCheckedMiercoles(false);
                    break;
                    case 'Jueves':
                    setCheckedJueves(false);
                    break;
                    case 'Viernes':
                    setCheckedViernes(false);
                    break;
                    case 'Sábado':
                    setCheckedSábado(false);
                    break;
                default:
                    break;
            }
        }  
        selectedDays.length > 0 || "Debe seleccionar al menos un día"
    };

    const checked = (day:any) => {
        switch (day) {
            case 'Lunes':
                return checkedLunes == false;
                case 'Martes':
                    return checkedMartes == false;
                case 'Miercoles':
                    return checkedMiercoles == false;
                case 'Jueves':
                    return checkedJueves == false;
                case 'Viernes':
                    return checkedViernes == false;
                case 'Sábado':
                    return checkedSábado == false;
            default:
                break;
        }
    }

    const watchHour1 = watch('hour1', '');
    const watchHour2 = watch('hour2', '');

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
                        <input defaultValue={data?.id} disabled hidden
                        {...register('id')}/>
                        <div>
                            <label className='form-label-admin'>Nombre</label>
                            <input className='form-input-admin'
                                defaultValue={data?.name}
                                placeholder='Ingrese su/s nombre/s'
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
                                defaultValue={data?.lastname}
                                placeholder='Ingrese su/s apellido/s'
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
                            <label className='form-label-admin'>DNI</label>
                            <input className='form-input-admin'
                                defaultValue={data?.dni}
                                placeholder='Ingrese su DNI'
                                {...register("dni", {
                                    required: "Por favor ingrese su DNI",
                                    validate: (value: number) => {
                                        if (value < 1000000 || value > 100000000) {
                                            return "Debe ingresar un DNI válido";
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: "DNI inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Teléfono celular</label>
                            <input className='form-input-admin'
                                defaultValue={data?.tel}
                                placeholder='Ingrese su número de teléfono'
                                {...register("tel",
                                    {
                                        required: "Por favor ingrese su número de teléfono",
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
                            <small className='texto-validaciones'>{errors.tel?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Email</label>
                            <input className='form-input-admin'
                                defaultValue={data?.email}
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
                            <select className="form-select form-input-admin" aria-label="Default select example" defaultValue={data?.speciality} {...register(
                                "speciality")} onClick= {() =>loadSpecialties()}>
                                {specialties.map(sp => (
                                    <option key= {sp.id+sp.speciality} value={sp.id}>{sp.speciality}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='form-label-admin'>Día/s</label>
                            {days.map(day => (
                                <div>
                                    <label key={day}>
                                        <input
                                            type='checkbox'
                                            onChange={() => handleCheckboxChange(day)}
                                            checked={selectedDays.includes(day)}
                                        />
                                        <span>{day}</span>
                                    </label>
                                    <label id='select' className='form-label-admin'>Horarios</label>
                                    <input type="time" id="appt" list="time-list"
                                        disabled={checked(day)}
                                        {...register("hour1", {
                                            required: "Por favor ingrese una hora",
                                        })}
                                    />
                                    <datalist id="time-list">
                                        {open.map((value: any) => (
                                            <option id="08" value={value} datatype="time" />
                                        ))}
                                    </datalist>
                                    <span>-</span>
                                    <input type="time" id="appt" list="time-list"
                                     disabled={checked(day)}
                                        {...register("hour2", {
                                            required: "Por favor ingrese una hora",
                                            validate: (value) => {
                                               if (watchHour1 && value > watchHour1) {
                                                return true
                                            } else {
                                                return 'Max time must be later than min time'}  
                                            },
                                        })}/>
                                    <datalist id="time-list">
                                        {open.map((value: any) => (
                                            <option id="08" value={value} datatype="time" />
                                        ))}
                                    </datalist>
                                    <small className='texto-validaciones'>{errors.hour2?.message}</small>
                                </div>
                            ))}
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>Agregar Profesional</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
