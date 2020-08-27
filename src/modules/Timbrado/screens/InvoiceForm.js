import React from 'react'

const InvoiceForm = () => {
    return(
        <div className="invoice-form">
            <form>
                <h3 className="lbl-header">Información para Facturación</h3>
                {/* AUTOFILL DATA */}
                <label className="lbl-form">RFC</label>
                <input className="txt--form" type="text" placeholder="Ingresa tu RFC"></input>
                <label className="lbl-form">Razón Social</label>
                <input className="txt--form" type="text" placeholder="Ingresa tu Razón Social"></input>
                <label className="lbl-form">Correo</label>
                <input className="txt--form" type="text" placeholder="Ingresa tu Correo"></input>
                <label className="lbl-form">Monto Total</label>
                <input className="txt--form" type="text" placeholder="Ingresa tu Monto Total"></input>
                <label className="lbl-form">Forma de Pago</label>
                <input className="txt--form" type="text" placeholder="Selecciona tu Forma de Pago"></input>
                <button className="btn--info">Limpiar</button>
            </form>
        </div>
    )
}

export default InvoiceForm