export const agentesConstants = {
    GETALL_REQUEST : 'GetAgentes_Request',
    GETALL_SUCCESS : 'GetAgentes_Success',
    GETALL_FAILURE : 'GetAgentes_Failure',

    IMPORT_REQUEST : 'ImportAgentes_Request',
    IMPORT_SUCCESS : 'ImportAgentes_Success',
    IMPORT_FAILURE : 'ImportAgentes_Failure',

    FILTER : 'FilterAgentes'
};

export const allowedColumns = [
    'Tipo' ,
    'Nombre',
    'RFC',
    'Email'
]

export const agenteImportar = '/agente/importar'
export const getAgentes = '/agente/listar'