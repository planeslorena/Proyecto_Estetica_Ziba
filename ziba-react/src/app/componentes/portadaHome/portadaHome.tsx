/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";
import './portadaHome.css'

export function PortadaHome() {
  return (
    <>
      <div className="containerPortada">
        <img src="imagenes/portadaHome.jpg" className="img-fluid imgPortada" alt="Imagen spa."></img>
      </div>
      <div>
        <p className="tituloPortada">Centro de estética</p>
      </div>
    </>

  )
}