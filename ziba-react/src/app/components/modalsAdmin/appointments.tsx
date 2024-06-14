import './appointments.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

interface data {
    dni: number,
    speciality: string,
    service: string,
    date: string,
    time: string,
}

interface appointmentsProps {
    show: boolean;
    handleClose: () => void;
}

export const AddAppoinments: React.FC<appointmentsProps> = ({ show, handleClose }) => {

    const { handleSubmit, register, formState: { errors, isValid } } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log();

    }

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
                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>Agregar turno</button>
                     
                     
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




