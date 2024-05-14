"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';

interface data {
    email:string,
    password:string
}

interface loginFormProps {
    onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onSwitchToRegister }) => {
    const { register, handleSubmit, formState: { errors, isValid }} = useForm<data>({ mode: "onChange" });
    const onSubmit: SubmitHandler<data> = (data) => {

        console.log(data);

        alert('exito');
    };


    return (
        <>
            <div className='contenedor-form contenedor'>
                <div className='form-registro'>
                    <h3>Iniciar sesión</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div>
                            <label className='form-label'>Email</label>
                            <input className='form-control'
                                type="email"
                                placeholder="Ingrese su email"
                                {...register("email", {
                                    required: 'Por favor ingrese su dirección de email',
                                    pattern: {
                                        value: /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                                        message: 'Correo invalido.'
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.email?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Contraseña</label>
                            <input className='form-control'
                            type="password"
                            placeholder="Ingrese su contraseña"
                                {...register("password", {
                                    required: 'Por favor ingrese su contraseña'
                                })} />
                            <small className='texto-validaciones'>{errors.password?.message}</small>
                        </div>
                        <input type="submit" disabled={!isValid} className='btn btn-success' value="Iniciar sesión" />
                    </form>
                    <small>¿Es tu primera vez en Zibá? <a href="#" onClick={onSwitchToRegister}>Regístrate</a></small>
                </div>
            </div>

        </>
    )
}