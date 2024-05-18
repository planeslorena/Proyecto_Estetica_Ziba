'use client'

import React from "react";
import './infoHome.css'

export const Cafeteria = () => {

    return (
        <>
            <div className='container-img-infohome'>

                <img className='img-armchairs' src="/imagenes/armchairs.jpg" alt="image armchairs" />
                <img className='img-cafeteria' src="/imagenes/cafeteria.jpg" alt="image cafeteria" />
               
                <div className='square-violet'> </div>
                <div className='border-violet'><p className="text-square">En Zibá, priorizamos tanto tu bienestar interno como externo. Contamos con los mejores profesionales y comodidades para asegurar tu relajación.
                Además, si no queres contratar nuestros servicios, contamos con una cafetería y área de descanso donde podes vivenciar nuestra estética al paso.</p> </div>
            </div>
           
        </>


    );
} 