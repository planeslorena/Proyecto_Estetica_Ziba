"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from "@/app/services/Login";
import { useState } from "react";
import "./loginForm.css";

interface data {
    username:string,
    password:string
}

interface loginFormProps {
    onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onSwitchToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const jwt = require("jsonwebtoken");
    const { register, handleSubmit, formState: { errors, isValid }} = useForm<data>({ mode: "onChange" });
    const jwt = require("jsonwebtoken");

    const onSubmit: SubmitHandler<data> = async (data) => {
        console.log(data);
        const resp = await login(data);
        alert( jwt.decode(resp.accessToken).usuario.role);
    };


    return (
        <>
            <div className='contenedor-form contenedor'>
                <div className="image">   
                </div>
                <div className='form-registro'>
                    <h3 className="title">Iniciar sesión</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div>
                            <label className='form-label'>Email</label>
                            <input className='form-control'
                                type="email"
                                placeholder="Ingrese su email"
                                {...register("username", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Email invalido.'
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.username?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Contraseña</label>
                            <input className='form-control'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Ingrese su contraseña"
                                {...register("password", {
                                    required: 'Por favor ingrese su contraseña'
                                })} />
                            <small className='texto-validaciones'>{errors.password?.message}</small>
                            {
                                (showPassword === false) ?
                                    <img width="24" height="24" src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible--v1" onClick={() => { setShowPassword(!showPassword) }} /> : <img width="24" height="24" src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible--v1" onClick={() => { setShowPassword(!showPassword) }} />
                            }
                        </div>
                        <input type="submit" disabled={!isValid} className='btn btn-success' value="Iniciar sesión" />
                    </form>
                    <small>¿Es tu primera vez en Zibá?{' '} <a href="#" onClick={onSwitchToRegister}>Regístrate</a></small>
                </div>
            </div>

        </>
    )
}