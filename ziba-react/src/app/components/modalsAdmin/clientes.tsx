import { Modal } from 'react-bootstrap';
import './clientes.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Interface } from 'readline';

interface data {
    name: string;
    lastname: string;
    dni: number;
    phone: number;
    email: string;
}

interface clientProps {
    show: boolean;
    handleClose: () => void;
}

export const AddClient: React.FC<clientProps> = ({ show, handleClose }) => {

    const { handleSubmit, register, formState: { errors, isValid } } = useForm<data>();
    const onSubmit: SubmitHandler<data> = (data) => {
        console.log();

    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='titulo-modal-cv'>Agregar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body className='cuerpo-modal'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className='form-label label-cv'>Nombre</label>
                            <input className='form-control input-cv'
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
                            <label className='form-label label-cv'>Apellido</label>
                            <input className='form-control input-cv'
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
                            <label className='form-label label-cv'>Dni</label>
                            <input className='form-control input-cv'
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
                            <label className='form-label label-cv'>Teléfono celular</label>
                            <input className='form-control input-cv'
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
                            <label className='form-label-register'>Email</label>
                            <input className='form-input-register'
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


                        <button type='submit' disabled={!isValid}>Agregar cliente</button>
                     
                     
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




