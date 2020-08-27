
import React from "react"
import logo from './doctoresLogo.jpeg'

const LogIn = () => {
    return(
        <div className="log-in">
            <img className="logo-img" src={logo}></img>
            <form className="log-in-form">
                <label className="lbl-form">Usuario</label>
                <input className="txt--form" placeholder="Ingresa tu usuario"></input>
                <label className="lbl-form">Contraseña</label>
                <input className="txt--form" placeholder="Ingresa tu contraseña"></input>
                <button className="btn--info" type="submit">Iniciar Sesión</button>
                <a className="link" href="/">¿Olvidaste tu contraseña?</a>
            </form>

        </div>
    )
}

export default LogIn

