import XLSX from 'xlsx';
import { sheetConstants } from '.';
import { alertActions } from '../Alert';


export const sheetActions = {
    handleFile,
    exportFile
};

/*const make_cols = refstr => {
    let o = [],
    range = XLSX.utils.decode_range(refstr),
    C = range.e.c + 1;
    for(var i = 0; i < C; ++i) {
        o[i] = {
            name:XLSX.utils.encode_col(i),
            key:i
        }
    }
	return o;
};*/

const make_columns = vector => {
    let o = [];
    for (var i = 0; i < vector.length; ++i) {
        o[i] = {
            name: vector[i],
            key: i
        }
    }
    return o;
}

function handleFile(file, callback) {
    return dispatch => {
        dispatch(request());
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const table = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            if (table.length) {
                let cols = make_columns(table[0]);
                let data = table.slice(1);
                /* let cols = make_cols(ws['!ref']); */
                dispatch(success({ data, cols }));
                dispatch(callback({ data, cols }));

            }
            else {
                dispatch(failure("Ocurrió un error al leer el archivo."));
                dispatch(alertActions.error("Ocurrió un error al leer el archivo."));
            }
        };

        if (rABS)
            reader.readAsBinaryString(file);
        else
            reader.readAsArrayBuffer(file);
    };

    function request() {
        return { type: sheetConstants.IMPORT_REQUEST }
    }

    function success(result) {
        return { type: sheetConstants.IMPORT_SUCCESS, result }
    }

    function failure(error) {
        return { type: sheetConstants.IMPORT_FAILURE, error }
    }
}

function exportFile(nombre, data, extension, callback) {
    return dispatch => {
        dispatch(request());
        if (typeof data !== 'undefined') {
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            var new_workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
            XLSX.writeFile(new_workbook, nombre + extension);
            dispatch(success());
            dispatch(callback());
        }
        else {
            dispatch(failure("Ocurrió un error generando el archivo."));
            dispatch(alertActions.error("Ocurrió un error generando el archivo."));
        }

    }

    function request() { return { type: sheetConstants.EXPORT_REQUEST } }
    function success(result) { return { type: sheetConstants.EXPORT_SUCCESS, result } }
    function failure(error) { return { type: sheetConstants.EXPORT_FAILURE, error } }
};