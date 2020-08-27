import { sheetConstants } from '../modules/ExcelSheets';

export function sheet(state = {}, action) {
  switch (action.type) {
    case sheetConstants.IMPORT_REQUEST:
      return { 
        requesting: true
      };
    case sheetConstants.IMPORT_SUCCESS:
      return {
        requesting : false,
        columns: action.result.cols,
        data: action.result.data
      };
    case sheetConstants.IMPORT_FAILURE:
      return {};
      case sheetConstants.EXPORT_REQUEST:
      return { 
        exporting: true
      };
    case sheetConstants.EXPORT_SUCCESS:
      return {
        exporting : false
      };
    case sheetConstants.EXPORT_FAILURE:
      return {};
    default:
      return {}
  }
}