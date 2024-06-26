import { useEffect, useState } from 'react';
import './professional.css';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getSpecialtiesWhitoutProf } from '@/app/services/Services';
import { createProf } from '@/app/services/User';
import Swal from 'sweetalert2';

interface TimeRange {
    hour1: string;
    hour2: string;
  }


interface data {
    id: number,
    name: string,
    lastname: string,
    dni: number,
    tel: number,
    email: string,
    speciality: number,
    days: string[],
    hour1: string[],
    hour2: string[],
}

const dias = ['Lunes', 'Miercoles', 'Jueves'];
const hour1 = '12:00';
const hour2 = '18:00';
const schedules = [
    { day: 'Lunes', checked: false, times: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'] },
    { day: 'Martes', checked: false, times: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'] },
    { day: 'Miercoles', checked: false, times: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'] },
    { day: 'Jueves', checked: false, times: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'] },
    { day: 'Viernes', checked: false, times: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'] },
    { day: 'Sábado', checked: false, times: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00', '20:30', '21:00'] },
];

interface professionalProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
    action: string;
}

export const AddProfessional: React.FC<professionalProps> = ({ show, handleClose, data, action }) => {
    const [checkedDay, setCheckedDay] = useState(schedules);
    const [specialties, setSpecialties] = useState([{ id: '', speciality: '' }]);
    const [errorRegister, setErrorRegister] = useState('');

    const { handleSubmit, register, formState: { errors, isValid }, watch, setError, control } = useForm<data>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<data> = async (data) => {
        if (data.days.length == 0) {
            setError('days', {
                type: "manual",
                message: "Elija por lo menos un día",
            })
        } else {

            const prof = {
                mail: data.email,
                password: 'prof1234',
                name: data.name,
                lastname: data.lastname,
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
    }

    const loadSpecialties = async () => {
        const resp = await getSpecialtiesWhitoutProf();
        setSpecialties(resp);
    }

    const handleCheckboxChange = (day: string) => {
        const newSchedule = checkedDay.map((item) => ({
            ...item,
            checked: (item.day == day) ? !item.checked : item.checked,
        }));
        setCheckedDay(newSchedule);
    };

    const dayTime = () => {
        const newSchedule = checkedDay.map((item) => ({
            ...item,
            checked: (dias.includes(item.day)),
        })
    );
        setCheckedDay(newSchedule);
    }

    useEffect(() => {
        if (action == 'Modificar') {
            dayTime()
    }}, []);

    const startTime  = watch('hour1');

    const getEndTimeOptions = (item:any) => {
        if (!startTime) return item.times;
        const startTimeIndex = item.times.indexOf(startTime);
        return item.times.slice(startTimeIndex + 1);
      };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >{action} profesional</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={data?.id} disabled hidden
                            {...register('id')} />
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
                            <select className="form-select form-input-admin" aria-label="Default select example"  {...register(
                                "speciality")} onClick={() => loadSpecialties()}>
                                <option value="" selected disabled hidden>Elija una especialidad</option>
                                {specialties.map(sp => (
                                    <option key={sp.id + sp.speciality} value={sp.id} selected={sp.speciality == data?.speciality}>{sp.speciality}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='form-label-admin'>Día/s</label>
                            {checkedDay.map(item => (
                                    <label key={item.day}>
                                        <input
                                            type='checkbox'
                                            {...register('days')}
                                            onChange={() => handleCheckboxChange(item.day)} 
                                            checked={item.checked}
                                            value={item.day}
                                        />
                                        <span>{item.day}</span>
                                    </label>
                                ))}
                                <small className='text-validation-register'>{errors.days?.message}</small>
                                     <label id='select' className='form-label-admin'>Horarios</label>
                                    <Controller
                                        name="hour1"
                                        control={control}
                                        rules={{ required: 'Hora de llegada requerida'}}
                                        render={({ field }) => (
                                            <select {...field}>
                                            <option value="" selected disabled hidden>Entrada</option> 
                                            {schedules.map(day => (
                                                day.times.map(time =>(
                                                <option key={time} value={time} selected={time == hour1}>
                                                {time}
                                                </option>
                                                ))
                                            ))}
                                            </select>
                                        )}
                                        />
                                    <span>-</span>
                                    <Controller
                                        name="hour2"
                                        control={control}
                                        rules={{ required: 'Hora de partida requerida'}}
                                        render={({ field }) => (
                                            <select {...field}>
                                            <option value="" selected disabled hidden>Salida</option> 
                                            {schedules.map(day => (
                                                getEndTimeOptions(day).map((time:any) => (
                                                    <option key={time} value={time} selected={time == hour2}>
                                                    {time}
                                                    </option>
                                                ))
                                            ))}
                                            </select>
                                        )}
                                        />
                                    <small className='texto-validaciones'>{errors.hour2?.message}</small>                   
                        </div>
                      
                        <small className='text-validation-register'>{errorRegister}</small>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>{action} Profesional</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
