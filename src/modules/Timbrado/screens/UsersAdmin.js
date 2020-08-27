
import React from "react"
import { Icon } from "semantic-ui-react"


const users = [
    {
        "id": 1,
        "rfc": "AAA010101AAA",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 2,
        "rfc": "BBB010101BBB",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 3,
        "rfc": "CCC010101CCC",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 4,
        "rfc": "DDD010101DDD",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 5,
        "rfc": "EEE0101010EEE",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 6,
        "rfc": "FFF010101FFF",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 1,
        "rfc": "AAA010101AAA",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 2,
        "rfc": "BBB010101BBB",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 3,
        "rfc": "CCC010101CCC",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 4,
        "rfc": "DDD010101DDD",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 5,
        "rfc": "EEE0101010EEE",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    },
    {
        "id": 6,
        "rfc": "FFF010101FFF",
        "razon_social": "EMPRESA S.A. DE C.V.",
        "correo": "empresa@e-mail.com"
    }
]

const UsersAdministration = () => {
    return(
        <div className="users-admin">
            <h3 className="lbl-header">Lista de Facturas</h3>
            <table className="users-table">
                <tr>
                    <th>ID</th>
                    <th>RFC</th>
                    <th>Razón Social</th>
                    <th>Correo Electrónico</th>
                    <th>Opciones</th>
                </tr>
                {
                    users.map(user => {
                        return(
                            <tr>
                                <td> {user.id} </td>
                                <td> {user.rfc} </td>
                                <td> {user.razon_social} </td>
                                <td> {user.correo} </td>
                                <td> 
                                    <button className="btn-option--update"><Icon color="" name="pencil alternate"/></button> 
                                    <button className="btn-option--delete"><Icon color="red" name="trash alternate outline"/></button>        
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default UsersAdministration