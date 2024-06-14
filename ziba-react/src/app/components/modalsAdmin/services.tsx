import './services.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
interface data {
    service: string,
    speciality: string,
    description:string,
    price: number,
    day: string,
    hour1: string,
    hour2: string,
    duration: string,
}

interface servicesProps {
    show: boolean;
    handleClose: () => void;
}

export const AddServices: React.FC<servicesProps> = ({ show, handleClose }) => {

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
                        <div>
                            <label className='form-label-admin'>Servicios</label>
                            <input className='form-input-admin'
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
                            <small className='texto-validaciones'>{errors.service?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Precio</label>
                            <input className='form-input-admin'
                                {...register("price", {
                                    required: "Por favor ingrese el precio",
                                    validate: (value: number) => {
                                        if (value <= 1000) {
                                            return 'El precio no puede ser menos de $1000';
                                        } else { if (value >= 999999) {
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
                            <label className='form-label-admin'>Día/s</label>
                            <label>
                                <input className='form-input-admin' type='checkbox'/>                         
                                <span>Lunes</span>
                            </label>
                            <label>
                                <input className='form-input-admin' type='checkbox'/>
                                <span>Martes</span>
                            </label>
                            <label>
                                <input className='form-input-admin' type='checkbox'/>
                                <span>Miercoles</span>
                            </label>
                            <label>
                                <input className='form-input-admin' type='checkbox'/>
                                <span>Jueves</span>
                            </label>
                            <label>
                                <input className='form-input-admin' type='checkbox'/>
                                <span>Viernes</span>
                            </label>
                           {/*  <small className='texto-validaciones'>{errors.price?.message}</small> */}
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Horarios</label>     
                                <select id='select' className="form-select form-input-admin" aria-label="Default select example"     
                                {...register("hour1", {
                                    required: "Por favor ingrese una hora",
                                })}> 
                                <option>15:00</option>
                                <option>16:00</option> 
                                <option>17:00</option>
                                <option>18:00</option> 
                                </select>
                                <span>-</span>
                                <select id='select' className="form-select form-input-admin" aria-label="Default select example"     
                                {...register("hour2", {
                                    required: "Por favor ingrese una hora",
                                })}> 
                                <option>15:00</option>
                                <option>16:00</option> 
                                <option>17:00</option>
                                <option>18:00</option> 
                                </select>
                                
                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <div>
                            <label id='select' className='form-label-admin'>Duración del turno</label>     
                                <select id='select' className="form-select form-input-admin" aria-label="Default select example"     
                                {...register("duration", {
                                    required: "Por favor ingrese una opción",
                                })}> 
                                <option>30 mins</option>
                                <option>1:00 hs</option> 
                                <option>1:30 hs</option>
                                <option>2:00 hs</option> 
                                </select>
                                
                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>Agregar servicio</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




