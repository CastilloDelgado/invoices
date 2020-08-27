import { empresasConstants } from '../modules/Empresas';
const initialState = {
    companies: [], 
    requesting: false
}

export function empresas(state = initialState, action) {
  switch (action.type) {
    case empresasConstants.GETASSIGNED_REQ:
        return {
            ...state,
            requesting : true,
        };
    case empresasConstants.GETASSIGNED_SUCCESS:
        return {
            ...initialState,
            companies: action.companies,
        };
    case empresasConstants.GETASSIGNED_FAILURE:
        return {
            ...state,
        };
    case empresasConstants.SELECT: 
        return{
            company: action.company
        }
    default:
        return {}
  }
}