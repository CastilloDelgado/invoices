
import React from "react"


const UsersRegistry = () => {
    return (
        <form className="user-registry-form">
            <h3 className="lbl-header">Registro de Usuarios</h3>
                <label className="lbl-form">RFC</label>
                <input className="txt--form" placeholder="Ingresa tu RFC" type="text"></input>
                <label className="lbl-form">Razón Social</label>
                <input className="txt--form" placeholder="Ingresa tu Razón Social" type="text"></input>
                <label className="lbl-form">Correo</label>
                <input className="txt--form" placeholder="Ingresa tu Correo" type="text"></input>
                <button className="btn--info">Registrar</button>
        </form>
    )
}

export default UsersRegistry
