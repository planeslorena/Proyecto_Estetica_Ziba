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
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<datos>({ mode: 'onChange'});

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
                                    validate: (value: number) => {
                                        if (value < 1000000 || value > 100000000) {
                                            return 'Debe ingresar un DNI valido';
                                        }
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
                                    minLength: 8,
                                    maxLength: 32,
                                    onBlur: () => { setShowTooltip(false) },
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(e.target.value)
                                      }
                                })} />
                            {
                                (showPassword === false) ?
                                    <img width="24" height="24" src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible--v1" onClick={() => { setShowPassword(!showPassword) }} /> : <img width="24" height="24" src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible--v1" onClick={() => { setShowPassword(!showPassword) }} />
                            }
                            {showTooltip && !checkComplexity(password) && (
                                <p className="text-danger">
                                    Contraseña debe contener por lo menos 8 caractéres (máx. 32), mayúscula, minuscula, numeros, y caractéres especiales.
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
                            {
                                (showRepeatPassword === false) ?
                                    <img width="24" height="24" src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible--v1" onClick={() => { setShowRepeatPassword(!showRepeatPassword) }} /> : <img width="24" height="24" src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible--v1" onClick={() => { setShowRepeatPassword(!showRepeatPassword) }} />
                            }
                            <small className='texto-validaciones'>{errors.repeatPassword?.message}</small>
                        </div>
                        <input type="submit" disabled={!isValid} className='btn btn-success' value="Registrarse" />
                    </form>
                    <small>¿Ya tenés una cuenta?{' '} <a href="#" onClick={onSwitchToLogin}>Iniciá sesión</a></small>
                </div>
            </div>
        </>
    )
}