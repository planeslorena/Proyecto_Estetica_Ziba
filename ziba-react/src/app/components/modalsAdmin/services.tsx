import { useEffect, useState } from 'react';
import './services.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
interface data {
    id: number,
    service: string,
    speciality: string,
    description: string,
    price: number,
    duration: string,
}

interface servicesProps {
    show: boolean;
    handleClose: () => void;
    data?: any;
}

export const AddServices: React.FC<servicesProps> = ({ show, handleClose, data }) => {
    const { handleSubmit, register, formState: { errors, isValid } } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log(data);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Agregar servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={data?.id} disabled hidden
                        {...register('id')}/>
                        <div>
                            <label className='form-label-admin'>Servicios</label>
                            <input className='form-input-admin'
                                defaultValue={data?.service}
                                placeholder='Ingrese el nombre del servicio'
                                {...register("service", {
                                    required: "Por favor ingrese un servicio",
                                    minLength: {
                                        value: 2,
                                        message: "El servicio no puede contener menos de 2 caracteres",

                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "El servicio no puede contener más de 100 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Servicio inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.service?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Especialidad</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                defaultValue={data?.speciality}
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
                            <label className='form-label-admin'>Descripción</label>
                            <input className='form-input-admin'
                                defaultValue={data?.description}
                                placeholder='Ingrese la descripción del servicio'
                                {...register("description", {
                                    required: "Por favor ingrese una descripción",
                                    minLength: {
                                        value: 50,
                                        message: "La descripción no puede contener menos de 50 caracteres",
                                    },
                                    maxLength: {
                                        value: 280,
                                        message: "La descripción no puede contener más de 280 caracteres",
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: "Servicio inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.description?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Precio</label>
                            <input className='form-input-admin'
                                defaultValue={data?.price}
                                placeholder='Ingrese un precio'
                                {...register("price", {
                                    required: "Por favor ingrese el precio",
                                    validate: (value: number) => {
                                        if (value <= 1000) {
                                            return 'El precio no puede ser menos de $1000';
                                        } else {
                                            if (value >= 999999) {
                                                return 'El precio no puede exceder los $999999';
                                            }
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: "Servicio inválido",
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.price?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Duración del turno</label>
                            <select id='select' className="form-select form-input-admin" aria-label="Default select example"
                                defaultValue={data?.duration}
                                {...register("duration", {
                                    required: "Por favor ingrese una opción",
                                })}>
                                <option>30 mins</option>
                                <option>1:00 hs</option>
                                <option>1:30 hs</option>
                                <option>2:00 hs</option>
                            </select>
                            <small className='texto-validaciones'>{errors.duration?.message}</small>
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>Agregar servicio</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}