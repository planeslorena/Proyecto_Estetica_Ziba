"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from "@/app/services/Login";
import { useState } from "react";
import "./loginForm.css";

interface data {
    username: string,
    password: string
}

interface loginFormProps {
    onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onSwitchToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const jwt = require("jsonwebtoken");
    const { register, handleSubmit, watch,setError, formState: { errors, isValid }} = useForm<data>({ mode: "onChange" });
    const onSubmit: SubmitHandler<data> = async (data) => {
        const resp = await login(data);
        if (resp == "No autorizado") {
            setError("password", {
                type: "manual",
                message: 'El mail o contraseña no son correctos.',
              })
        } else {
            alert( jwt.decode(resp.accessToken).usuario.role);
            
        }
    };
    const passwordValue = watch("password", "");


    return (
        <>
            <div className='container-form-login '>
                <div className="image-login"></div>
                <div className='form-login'>
                    <img src="/imagenes/logoziba-small.png" alt="" className="img-logoziba-small-login" />
                    <h3 className="title-login">Iniciar sesión</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <div>
                            <label className='form-label-login'>Email</label>
                            <input className='input-login'
                                type="email"
                                placeholder="Ingrese su email"
                                {...register("username", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Email invalido.'
                                    }
                                })} />
                            <small className='text-validation-login'>{errors.username?.message}</small>
                        </div>
                        <div>
                            <label className='form-label-login'>Contraseña</label>
                            <div className="password-input-login">
                                <input id="password" className='form-input-login'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingrese su contraseña"
                                    {...register("password", {
                                        required: 'Por favor ingrese su contraseña'
                                    })} />

                                {passwordValue && (
                                    <div className="visible-invisible-login">
                                        {showPassword ? (
                                            <img src="https://img.icons8.com/material/24/000000/visible--v1.png" alt="visible" onClick={() => setShowPassword(false)} />
                                        ) : (
                                            <img src="https://img.icons8.com/material/24/000000/invisible--v1.png" alt="invisible" onClick={() => setShowPassword(true)} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <small className='text-validation-login'>{errors.password?.message}</small>
                        <button type="submit" disabled={!isValid} className='button-login'> Iniciar sesion</button>
                    </form>
                    <div className="container-question">
                        <p >¿Es tu primera vez en Zibá?{' '}</p>
                        <a href="#" onClick={onSwitchToRegister}className="a-registrate">Regístrate </a>
                    </div>
                </div>
            </div>

        </>
    )
}