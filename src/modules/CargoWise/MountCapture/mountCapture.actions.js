import { alertActions } from '../../Alert'
import { mountCaptureConstants, mountCaptureService } from '.'
import { chargeCodeService } from '../ChargeCode'

export const mountsCaptureActions = {
    getMounts,
    updateMounts
}

function getMounts(filtro, idUsuario){
    return dispatch => {
        dispatch(request())
        mountCaptureService.getMounts(filtro, idUsuario)
            .then(
                response => {
                    dispatch(success(response.data))
                },
                error => {
                    dispatch(failure(error.toString()))
                }
            )
    }

    function request(){return {type: mountCaptureConstants.GET_MOUNTS_REQUEST}}
    function success(response){return {type: mountCaptureConstants.GET_MOUNTS_SUCCESS, response}}
    function failure(){return {type: mountCaptureConstants.GET_MOUNTS_FAILURE}}
}

function updateMounts(invoiceList, mountsList){
    return dispatch => {
        dispatch(request())
        const invoiceData = mountsList.filter((mount, index) => {
            const invoiceAssing = invoiceList.filter(invoice => invoice.id == index)
            mount.idInvoice = index
            return(
                mount.total === parseFloat(invoiceAssing[0].total)
            )  
        })

        var requestBody = []
        invoiceData.forEach(data => {
            var entries =  Object.entries(data)
            entries.forEach(entrie => {
                if(entrie[0] != "total" && entrie[0] != "idInvoice"){
                    requestBody.push(
                        {
                            "idInvoice": data.idInvoice, 
                            "job": entrie[0],
                            "mount": entrie[1]
                        }
                    )
                }
            })
        })

        mountCaptureService.updateMounts(requestBody)
            .then(
                response => {
                    dispatch(success(response.data))
                    dispatch(alertActions.success(response.message))
                    dispatch(getMounts())
                },
                error => {
                    dispatch(failure(error.toString()))
                }
            )
    }

    function request(){return {type: mountCaptureConstants.POST_MOUNTS_REQUEST}}
    function success(response){return {type: mountCaptureConstants.POST_MOUNTS_SUCCESS, response}}
    function failure(response){return {type: mountCaptureConstants.POST_MOUNTS_FAILURE, response}}   
}