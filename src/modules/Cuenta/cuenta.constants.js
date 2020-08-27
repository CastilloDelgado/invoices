export const cuentasConstants = {
    IMPORT_REQUEST : 'ImportCuentas_Request',
    IMPORT_SUCCESS : 'ImportCuentas_Success',
    IMPORT_FAILURE : 'ImportCuentas_Failure',

    GETALL_REQUEST : 'GetCuentas_Request',
    GETALL_SUCCESS : 'GetCuentas_Success',
    GETALL_FAILURE : 'GetCuentas_Failure',

    GETAGENTECUENTA_REQUEST : 'GetAgenteCuenta_Request',
    GETAGENTECUENTA_SUCCESS : 'GetAgenteCuenta_Success',
    GETAGENTECUENTA_FAILURE : 'GetAgenteCuenta_Failure',
};

export const allowedColumns = [
    'NCuenta' ,
    'RFC',
    'TipoCuenta'
]

export const cuentaImportar = '/agente/importar-cuentas'
export const getCuentas = '/cuenta/listar'
export const getCuentaAgente = '/cuenta/listar-ca'