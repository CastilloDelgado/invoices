export const sheetConstants = {
    IMPORT_REQUEST : 'Import_Request',
    IMPORT_SUCCESS : 'Import_Success',
    IMPORT_FAILURE : 'Import_Failure',

    EXPORT_REQUEST : 'Export_Request',
    EXPORT_SUCCESS : 'Export_Success',
    EXPORT_FAILURE : 'Export_Failure',
};

export const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map((x) => { return "." + x; }).join(",");