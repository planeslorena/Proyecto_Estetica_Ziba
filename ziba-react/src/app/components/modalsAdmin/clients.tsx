import { createUser } from '@/app/services/User';
import './clients.css';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2'


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
    const onSubmit: SubmitHandler<data> = async (data) => {
        const user = {
            mail: data.email,
            password: 'cliente1234',
            name: data.name,
            lastname:data.lastname,
            dni: data.dni,
            phone: data.phone,
            role: 'client'
        }
        const resp = await createUser(user);

        if (resp == 409) {
           setErrorRegister('El mail indicado ya se encuentra registrado.')
        } else {
            Swal.fire({
            title: `Alta Cliente`,
            text: "Cliente registrado con exito!",
            icon: "success"
            });
            handleClose();
        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar cliente</Modal.Title>
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
                            <small className='text-validation-admin'>{errors.email?.message}</small>
                        </div>


                        <button type='submit' disabled={!isValid} className='button-agregarcliente'>Agregar cliente</button>
                     
                     
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}




function setErrorRegister(arg0: string) {
    throw new Error('Function not implemented.');
}

