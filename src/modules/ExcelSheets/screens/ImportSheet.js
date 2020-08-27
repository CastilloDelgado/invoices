import React, { Component } from "react";
import {connect} from 'react-redux';
import XLSX from 'xlsx';

import { Dropzone } from "./";
import { SheetJSFT, sheetActions } from '../';

class ImportSheet extends Component {
	/* exportFile() {
		const ws = XLSX.utils.aoa_to_sheet(this.state.data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		XLSX.writeFile(wb, "sheetjs.xlsx")
    }; */
    
	render() { 
        const { handleFile, callback } = this.props;
        return (
            <Dropzone handleFile={handleFile} acceptFiles={SheetJSFT} callback={callback}/>
        ); 
    };
};

const mapStateToProps = (state) => {
    return {
        cols: state.sheet.cols,
        data: state.sheet.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleFile: (file, callback) => dispatch(sheetActions.handleFile(file,callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportSheet);