"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

interface datos {
    name: string,
    lastname: string,
    dni: number,
    phone: number,
    email: string,
    password: string,
    repeatPassword: string
}

interface registerProps {
    onSwitchToLogin: () => void
}

export const RegisterForm: React.FC<registerProps> = ({ onSwitchToLogin }) => {
    const [password, setPassword] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<datos>();

    const onSubmit: SubmitHandler<datos> = (datos) => {

        console.log(datos);

        alert('exito');
    };

    const checkComplexity = (password: string): boolean => {
        // Define your password complexity rules here
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    return (
        <>
            <div className='contenedor-form contenedor'>
                <div className='form-registro'>

                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div>
                            <label className='form-label'>Nombre</label>
                            <input className='form-control'
                                placeholder="Ingrese su nombre"
                                {...register("name", {
                                    required: 'Por favor ingrese nombre',
                                    minLength: {
                                        value: 2,
                                        message: 'El contenido no puede ser menos de 2 caractéres.'
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: 'El contenido no puede exceder los 100 caractéres.'
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: 'Nombre invalido'
                                    },
                                })} />
                            <small className='texto-validaciones'>{errors.name?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Apellido</label>
                            <input className='form-control'
                                placeholder="Ingrese su apellido"
                                {...register("lastname", {
                                    required: 'Por favor ingrese su apellido',
                                    minLength: {
                                        value: 2,
                                        message: 'El contenido no puede ser menos de 2 caractéres.'
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: 'El contenido no puede exceder los 100 caractéres.'
                                    },
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: 'Apellido invalido'
                                    },
                                })} />
                            <small className='texto-validaciones'>{errors.lastname?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>DNI</label>
                            <input className='form-control'
                                placeholder="Ingrese su dni (Sin puntos)"
                                {...register("dni", {
                                    required: 'Por favor ingrese su dni',
                                    minLength: {
                                        value: 1000000,
                                        message: 'Debe ingresar un DNI valido',
                                    },
                                    maxLength: {
                                        value: 100000000,
                                        message: 'Debe ingresar un DNI valido'
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'DNI invalido'
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Email</label>
                            <input className='form-control'
                                placeholder="Ingrese su email"
                                {...register("email", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Dirección de email invalida'
                                    },
                                })} />
                            <small className='texto-validaciones'>{errors.email?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Teléfono celular</label>
                            <input className='form-control'
                                placeholder="Ingrese su teléfono celular (Ej.: 2284123456)"
                                {...register("phone", {
                                    required: 'Por favor ingrese su número de celular',
                                    minLength: {
                                        value: 10,
                                        message: 'Número invalido',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Número invalido',
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'Numero de teléfono invalido'
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.phone?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Contraseña</label>
                            <input className='form-control'
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingrese su contraseña"
                                id="password"
                                onFocus={() => {
                                    setShowTooltip(true)
                                }}
                                {...register("password", {
                                    required: 'Por favor ingrese una contraseña',
                                    minLength: {
                                        value: 8,
                                        message: 'El contenido no puede ser menos de 2 caractéres.'
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: 'El contenido no puede exceder los 32 caractéres.'
                                    },
                                    onBlur: () => { setShowTooltip(false) },
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(e.target.value)
                                      }
                                })} />
                            {
                                (showPassword === false) ?
                                    <img width="48" height="48" src="https://img.icons8.com/pulsar-color/48/423155/visible.png" alt="visible" onClick={() => { setShowPassword(!showPassword) }} /> : <img width="48" height="48" src="https://img.icons8.com/pulsar-color/48/423155/closed-eye.png" alt="invisible" onClick={() => { setShowPassword(!showPassword) }} />
                            }
                            {showTooltip && !checkComplexity(password) && (
                                <p className="text-danger">
                                    Contraseña debe contener por lo menos 8 caractéres, mayúscula, minuscula, numeros, y caractéres especiales.
                                </p>
                            )}
                            <small className='texto-validaciones'>{errors.password?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Confirmar contraseña</label>
                            <input className='form-control'
                                type={showRepeatPassword ? 'text' : 'password'}
                                placeholder="Ingrese su contraseña"
                                {...register("repeatPassword", {
                                    required: 'Por favor ingrese una contraseña',
                                    validate: (val: string) => {
                                        if (watch('password') != val) {
                                            return "Las contraseñas no coinciden";
                                        }
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'Numero de telefono invalido'
                                    }
                                })} />
                            <input type="button" onClick={() => { setShowRepeatPassword(!showRepeatPassword) }} value='Show' />
                            <small className='texto-validaciones'>{errors.repeatPassword?.message}</small>
                        </div>
                        <input type="submit" className='btn btn-success' value="Registrarse" />
                    </form>
                    <small>¿Ya tenés una cuenta?{' '} <a href="#" onClick={onSwitchToLogin}>Iniciá sesión</a></small>
                </div>
            </div>
        </>
    )
}