import './services.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';




interface data {
    service: string;
    speciality: string;
    professional: string;
    date: string;
}

interface servicesProps {
    show: boolean;
    handleClose: () => void;
}

export const AddServices: React.FC<servicesProps> = ({ show, handleClose }) => {

    const { handleSubmit, register, formState: { errors, isValid } } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log();

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
                            <label className='form-label-admin'>Especialidad</label>
                           
                            
                                <select className="form-select form-input-admin" aria-label="Default select example"     {...register("speciality", {
                                    required: "Por favor ingrese una especialidad",
                                })}> 
                                <option>Masajes</option>
                                <option >Peluqueria</option> 
                                <option>Manicura</option>
                                <option>Depilación</option> 
                                </select>
                                
                            <small className='texto-validaciones'>{errors.speciality?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-admin'>Dni</label>
                            <input className='form-input-admin'
                                {
                                ...register("professional", {
                                    required: "Por favor ingrese el profesional",
                                    

                                })} />
                            <small className='texto-validaciones'>{errors.professional?.message}</small>
                        </div>
                        



                        <button type='submit' disabled={!isValid} className='button-agregarprofesional'>Agregar servicio</button>


                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




